const moment = require('moment')
const fs = require('fs')
const axios = require('axios')
const dotenv = require('dotenv')
dotenv.config()
const gitLabApiClient = require('./gitlabApiClient.js')

gitLabApiClient.init(process.argv[2]) // init client with [1,2] num from args

const since_date = moment().add('-400', 'days')

let all_events_cache = []
try {
  all_events_cache = JSON.parse(
    fs.readFileSync(
      `lib/gitlab_cache/gitlab_events_history_${gitLabApiClient.config.GITLAB_INSTANCE}.json`))
} catch (e) {

}

const main = async () => {
  if (all_events_cache.length < 1 || moment(all_events_cache[0].created_at) < moment().add('-30', 'days')) { // cache empty or too old
    console.log('Existing cache empty or most recent event to long ago, loading big event data now...')
    all_events_cache = await gitLabApiClient.getAll(
      'events?action=pushed&=100&after=' +
      since_date.format('Y-MM-DD'))
    fs.writeFileSync(
      `lib/gitlab_cache/gitlab_events_history_${gitLabApiClient.config.GITLAB_INSTANCE}.json`,
      JSON.stringify(all_events_cache))
  }

  console.log('Fetching user projects')
  let projects = await gitLabApiClient.getProjects()


  console.log(`Mapping ${all_events_cache.length} to contribution datamodel`)
  const filtered = all_events_cache.filter(
    e => e.push_data.commit_count > 0).map((event) => {
    const p = projects[event.project_id]
    return {
      id: event.push_data.commit_to,
      authoredDate: event.created_at,
      day: moment(event.created_at).format('Y-MM-DD'),
      message: event.push_data.commit_title,
      type: 'gitlab',
      repository: {
        id: p.id,
        name: p.name,
        url: p.url,
        avatar: p.avatar,
        visibility: p.visibility,
      },
    }
  })
  fs.writeFileSync(
    `lib/gitlab_contribution_history_cache_${gitLabApiClient.config.GITLAB_INSTANCE}.json`,
    JSON.stringify({
      date: moment().toISOString(),
      data: filtered,
    }))
  console.log('done.')
}
main()

