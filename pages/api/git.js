import gql from 'graphql-tag'
import standaloneGitHubApolloClient from '../../lib/githubApolloClient'
import fs from 'fs'
import moment from 'moment'
import path from 'path'

// TODO: Move caches to seperate cache folder

export default async (req, res) => {
  const {
    query: { start },
  } = req
  const startDate = moment.unix(start)

  const confidentialRepositories = [
    'drimpy',
  'vra'
  ]

  const GITHUB_GET_CONTRIBUTIONS_QL = gql`

      query($SINCE_DATETIME: DateTime, $SINCE_GITTIMESTAMP: GitTimestamp){
          viewer {
              contributionsCollection(from: $SINCE_DATETIME){
                  commitContributionsByRepository{
                      resourcePath
                      repository{
                          id
                          name
                          url
                          isPrivate
                          refs(last:100, refPrefix:"refs/heads/"){
                              nodes{
                                  name
                                  target{
                                      ... on Commit{
                                          history(first:80, since: $SINCE_GITTIMESTAMP, author:{id: "MDQ6VXNlcjIwMTExMTk0"}){
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
  // let githubContributionsHistoryCache = null
  // try {
  //   githubContributionsHistoryCache = fs.readFileSync(
  //     path.join(process.cwd(), 'lib/github_contribution_cache.json'))
  // } catch (e) {
  //
  // }
  let fetchGit = async () => {
    const githubClient = standaloneGitHubApolloClient()
    githubContributionsHistory = await githubClient.query(
      GITHUB_GET_CONTRIBUTIONS_QL, {
        SINCE_DATETIME: startDate.toISOString(),
        SINCE_GITTIMESTAMP: startDate.toISOString(),
      })
    // write github to cache
    // fs.writeFileSync(
    //   path.join(process.cwd(), 'lib/github_contribution_cache.json'),
    //   JSON.stringify(
    //     { timestamp: moment().unix(), raw: githubContributionsHistory }))
  }
  await fetchGit()

  // if (githubContributionsHistoryCache == null) {
  //   await fetchGit()
  // } else {
  //   let cache = JSON.parse(githubContributionsHistoryCache)
  //   if (moment(cache.timestamp).diff(moment(), 'hours') > 1) {
  //     await fetchGit()
  //   } else {
  //     githubContributionsHistory = cache.raw
  //   }
  // }

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
                id: repo.repository.id,
                url: repo.repository.url,
                name: repo.repository.name,
                avatar: null,
                visibility: ((repo.repository.isPrivate)
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

  for (let i = 1; i < 2; i++) {
    let gitLabContributions = JSON.parse(fs.readFileSync(
      path.join(process.cwd(),
        `lib/gitlab_contribution_history_cache_${i}.json`)))
    let gitLabIDs = []

    gitLabContributions.data.forEach((contribution) => {

      // removing before startdate
      if (moment(contribution.day).unix() > start) {
        if (!dailyContributions[contribution.day]) dailyContributions[contribution.day] = []
        gitLabIDs.push(contribution.id)
        dailyContributions[contribution.day].push(contribution)
      }
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

  let obfuscrateStringFill = (length) => {
    const characters = ['%', '$', '#', '@', '*', '!', '^', '0', '1', 'x']
    let result = ''
    for (let i = 0; i < length; i++) {
      result += characters[Math.floor(
        Math.random() * Math.floor(characters.length))]
    }
    return result
  }

  let isConfidential = (name) => {
    let isConfidentialName = false
    confidentialRepositories.forEach((confidentialName) => {

      if (confidentialName.includes(name) ||
        name.includes(confidentialName)) {
        isConfidentialName = confidentialName
      }
    })
    return isConfidentialName
  }

  let dailyContributionsSorted = {}

  Object.keys(dailyContributions).sort().forEach(key => {
    let contributions = dailyContributions[key]
    contributions.forEach((contribution) => {
      if (contribution.message && contribution.message.length > 0 &&
        (isConfidential(contribution.repository.name.toLowerCase()) !== false || isConfidential(contribution.repository.url.toLowerCase()) !== false)) {
        contribution.message = contribution.message.slice(0, 3) +
          obfuscrateStringFill(contribution.message.length - 5)
        contribution.repository.name = isConfidential(contribution.repository.name.toLowerCase())
        contribution.repository.url = ''
      }
    })
    dailyContributionsSorted[key] = contributions
  })
  // removing private messages

  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({
    contributions: dailyContributionsSorted,
  }))
}
