import gql from 'graphql-tag'
import standaloneGitHubApolloClient from './githubApolloClient'
import moment from 'moment'

import gitlabContributionConverter from "./gitlabContributionConverter";

// const getGitlabProjectCommits = require("./gitlab_contribution_converter.js")
// TODO: Move caches to seperate cache folder

export default async (startDate) => {

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
    const fetchGit = async () => {
        const githubClient = standaloneGitHubApolloClient()
        githubContributionsHistory = await githubClient.query(
            GITHUB_GET_CONTRIBUTIONS_QL, {
                SINCE_DATETIME: startDate.toISOString(),
                SINCE_GITTIMESTAMP: startDate.toISOString(),
            })
    }
    await fetchGit()

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


    return {contributions: dailyContributionsSorted}
    // removing private messages

    // res.statusCode = 200
    // res.setHeader('Content-Type', 'application/json')
    // res.end(JSON.stringify({
    //     contributions: dailyContributionsSorted,
    // }))
}
