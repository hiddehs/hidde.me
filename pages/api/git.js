import gql from 'graphql-tag'
import standaloneGitHubApolloClient from '../../lib/githubApolloClient'

const gitLabApiClient = require('../../lib/gitlabApiClient.js')
import fs from 'fs'
import moment from 'moment'
import { concatAST } from 'graphql'

export default async (req, res) => {
  const since_date = moment().add('-275', 'days').toISOString()

  const GITHUB_GET_CONTRIBUTIONS_QL = gql`
      query{
          viewer {
              contributionsCollection(from: "2020-01-01T00:00:00"){
                  commitContributionsByRepository{
                      contributions(last:100){
                          nodes{
                              occurredAt
                              commitCount
                              repository{
                                  name
                                  url
                                  isPrivate
                                  refs(last:100, refPrefix:"refs/heads/"){
                                      nodes{
                                          name
                                          target{
                                              ... on Commit{
                                                  id
                                                  history(first:30, author:{id: "MDQ6VXNlcjIwMTExMTk0"}){
                                                      nodes{
                                                          authoredDate
                                                          message
                                                      }
                                                  }
                                              }
                                          }
                                      }
                                  }
                              }
                          }
                      }
                      resourcePath
                  }
                  #   contributionCalendar{
                  #     totalContributions
                  #     weeks{
                  #       contributionDays{
                  #         contributionCount
                  #         date
                  #       }
                  #     }
                  #   }
              }
          }
      }

  `

  const githubClient = standaloneGitHubApolloClient()
  let githubContributionsHistory = await githubClient.query(
    GITHUB_GET_CONTRIBUTIONS_QL)

  let dailyContributions = {}

  githubContributionsHistory.data.viewer.contributionsCollection.commitContributionsByRepository.forEach(
    (repo) => {
      repo.contributions.nodes.forEach((contribution) => {
        contribution.repository.refs.nodes.forEach((ref) => {
          ref.target.history.nodes.forEach(his => {
            const day = moment(his.authoredDate).format('Y-MM-DD')
            if (!dailyContributions[day]) dailyContributions[day] = []
            dailyContributions[day].push({
              type: 'github',
              id: ref.target.id,
              repository: {
                url: contribution.repository.url,
                name: contribution.repository.name,
                visibility: ((contribution.repository.isPrivate)
                  ? 'private'
                  : 'public'),
              },
              ...his,
            })
          })
        })
      })
    })

  // Adding GitLab Cache (made on build time)

  let gitLabContributions = JSON.parse(fs.readFileSync(
    'lib/gitlab_contribution_history_cache.json'))
  let gitLabIDs = []
  gitLabContributions.data.forEach((contribution) => {
    if (!dailyContributions[contribution.day]) dailyContributions[contribution.day] = []
    gitLabIDs.push(contribution.id)
    dailyContributions[contribution.day].push(contribution)
  })

  // Adding data that is new from GitLab API

  let newGitLabContributions = (await gitLabApiClient.getAll(
    'users/1778667/events?action=pushed&=100&after=' +
    moment(gitLabContributions.date).add('-1', 'days').format('Y-MM-DD')))
  if (newGitLabContributions.length > 0) {

    // TODO: Make module for converting gitlab data to datamodel
    let projects = []
    const fetchProjects = async () => {
      let resp = await gitLabApiClient.get('projects?per_page=100&owned=1')
      resp.map((p) => {
        projects[p.id] = {
          name: p.name,
          url: p.web_url,
          visibility: p.visibility,
        }
      })
    }

    if (projects.length < 1) {
      await fetchProjects()
    }
    newGitLabContributions.forEach((event) => {
      if (!gitLabIDs.includes(event.push_data.commit_to)) {

        const p = projects[event.project_id]
        const day = moment(event.created_at).format('Y-MM-DD')
        if (!dailyContributions[day]) dailyContributions[day] = []
        dailyContributions[day].push({
          id: event.push_data.commit_to,
          authoredDate: event.created_at,
          message: event.push_data.commit_title,
          newlyAdded: true,
          type: 'gitlab',
          repository: {
            name: p.name,
            url: p.url,
            visibility: p.visibility,
          },
        })
      }
    })
  }

  // Sorting ASC Date (key)

  let dailyContributionsSorted = {}
  Object.keys(dailyContributions).sort().forEach(key => {
    dailyContributionsSorted[key] = dailyContributions[key]
  })

  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({
    api: {
      contributions: dailyContributionsSorted,
    },
  }))
}
