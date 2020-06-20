import gql from 'graphql-tag'
import standaloneGitHubApolloClient from '../../lib/githubApolloClient'

const gitLabApiClient = require('../../lib/gitlabApiClient.js')
import fs from 'fs'
import moment from 'moment'
import { concatAST } from 'graphql'
import path from 'path'

// TODO: Move caches to seperate cache folder

export default async (req, res) => {
  const GITHUB_GET_CONTRIBUTIONS_QL = gql`

      query($SINCE_DATE: DateTime){
          viewer {
              contributionsCollection(from: $SINCE_DATE){
                  commitContributionsByRepository{
                      resourcePath
                      repository{
                          name
                          url
                          isPrivate
                          refs(last:100, refPrefix:"refs/heads/"){
                              nodes{
                                  name
                                  target{
                                      ... on Commit{
                                          history(first:30, author:{id: "MDQ6VXNlcjIwMTExMTk0"}){
                                              nodes{
                                                  id
                                                  authoredDate
                                                  message
                                              }
                                          }
                                      }
                                  }
                              }
                          }
                      }
                      url
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
  let githubContributionsHistory
  let githubContributionsHistoryCache = null
  try {
    githubContributionsHistoryCache = fs.readFileSync(
      path.join(process.cwd(), 'lib/github_contribution_cache.json'))
  } catch (e) {

  }

  let fetchGit = async () => {
    const githubClient = standaloneGitHubApolloClient()
    githubContributionsHistory = await githubClient.query(
      GITHUB_GET_CONTRIBUTIONS_QL, {
        SINCE_DATE: moment().add('-275', 'days').toISOString(),
      })
    // write github to cache
    fs.writeFileSync(
      path.join(process.cwd(), 'lib/github_contribution_cache.json'),
      JSON.stringify(
        { timestamp: moment().unix(), raw: githubContributionsHistory }))
  }

  if (githubContributionsHistoryCache == null) {
    await fetchGit()
  } else {
    let cache = JSON.parse(githubContributionsHistoryCache)
    if (moment(cache.timestamp).diff(moment(), 'hours') > 1) {
      await fetchGit()
    } else {
      githubContributionsHistory = cache.raw
    }
  }

  let dailyContributions = {}

  let gitHubIds = []

  githubContributionsHistory.data.viewer.contributionsCollection.commitContributionsByRepository.forEach(
    (repo) => {
      repo.repository.refs.nodes.forEach((ref) => {
        ref.target.history.nodes.forEach(his => {
          const day = moment(his.authoredDate).format('Y-MM-DD')
          if (!gitHubIds.includes(his.id)) {
            if (!dailyContributions[day]) dailyContributions[day] = []
            gitHubIds.push(his.id)
            dailyContributions[day].push({
              type: 'github',
              repository: {
                url: repo.url,
                name: repo.name,
                visibility: ((repo.isPrivate)
                  ? 'private'
                  : 'public'),
              },
              ...his,
            })
          }
        })
      })
    })

  // Adding GitLab Cache (made on build time)

  for (let i = 1; i < 3; i++) {
    gitLabApiClient.init(i)
    let gitLabContributions = JSON.parse(fs.readFileSync(
      path.join(process.cwd(), `lib/gitlab_contribution_history_cache_${i}.json`)))
    let gitLabIDs = []
    gitLabContributions.data.forEach((contribution) => {
      if (!dailyContributions[contribution.day]) dailyContributions[contribution.day] = []
      gitLabIDs.push(contribution.id)
      dailyContributions[contribution.day].push(contribution)
    })
  }

  // Adding data that is new from GitLab API

  // let newGitLabContributions = (await gitLabApiClient.getAll(
  //   'users/1778667/events?action=pushed&=100&after=' +
  //   moment(gitLabContributions.date).add('-1', 'days').format('Y-MM-DD')))
  // if (newGitLabContributions.length > 0) {
  //
  //   // TODO: Make module for converting gitlab data to datamodel
  //   let projects = []
  //   const fetchProjects = async () => {
  //     let resp = await gitLabApiClient.get('projects?per_page=100&owned=1')
  //     resp.map((p) => {
  //       projects[p.id] = {
  //         name: p.name,
  //         url: p.web_url,
  //         visibility: p.visibility,
  //       }
  //     })
  //   }
  //
  //   if (projects.length < 1) {
  //     await fetchProjects()
  //   }
  //   newGitLabContributions.forEach((event) => {
  //     if (!gitLabIDs.includes(event.push_data.commit_to)) {
  //
  //       const p = projects[event.project_id]
  //       const day = moment(event.created_at).format('Y-MM-DD')
  //       if (!dailyContributions[day]) dailyContributions[day] = []
  //       dailyContributions[day].push({
  //         id: event.push_data.commit_to,
  //         authoredDate: event.created_at,
  //         message: event.push_data.commit_title,
  //         newlyAdded: true,
  //         type: 'gitlab',
  //         repository: {
  //           name: p.name,
  //           url: p.url,
  //           visibility: p.visibility,
  //         },
  //       })
  //     }
  //   })
  // }

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
