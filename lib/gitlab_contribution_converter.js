const moment = require('moment')
const fs = require('fs')
const axios = require('axios')
const dotenv = require('dotenv')
dotenv.config()
const gitLabApiClient = require('./gitlabApiClient.js')

const url = require('url')


const ai = axios.create({
  timeout: 30000,
  headers: { 'PRIVATE-TOKEN': GITLAB_ACCESS_TOKEN },
})

const since_date = moment().add('-275', 'days')

let all_events_cache = []
try {
  all_events_cache = JSON.parse(
    fs.readFileSync(
      `lib/gitlab_cache/gitlab_events_history_${GITLAB_INSTANCE}.json`))
} catch (e) {

}

const main = async () => {
  if (all_events_cache.length < 1) {
    console.log('Existing cache empty, loading big event data now...')
    let all_events_cache = (await gitLabApiClient.getAll(
      'users/1778667/events?action=pushed&=100&after=' +
      since_date.format('Y-MM-DD')))
    fs.writeFileSync(
      `lib/gitlab_cache/gitlab_events_history_${GITLAB_INSTANCE}.json`,
      JSON.stringify(all_events_cache))
  }

  console.log('Fetching user projects')
  let projects = []
  // TODO: Convert into Client module func
  const fetchProjects = async () => {
    let resp = await ai.get(
      GITLAB_BASE_URL + 'projects?per_page=100&owned=1')
    resp.data.map((p) => {
      projects[p.id] = {
        name: p.name,
        url: p.web_url,
        visibility: p.visibility,
      }
    })
  }
  await fetchProjects()
  console.log('Mapping to contribution datamodel')
  const filtered = all_events_cache.map((event) => {
    const p = projects[event.project_id]
    return {
      id: event.push_data.commit_to,
      authoredDate: event.created_at,
      day: moment(event.created_at).format('Y-MM-DD'),
      message: event.push_data.commit_title,
      type: 'gitlab',
      repository: {
        name: p.name,
        url: p.url,
        visibility: p.visibility,
      },
    }
  })
  fs.writeFileSync(
    `lib/gitlab_contribution_history_cache_${GITLAB_INSTANCE}.json`,
    JSON.stringify({
      date: moment().toISOString(),
      data: filtered,
    }))
  console.log('done.')
}
main()

