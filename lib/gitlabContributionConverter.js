import moment from "moment/moment";
import gitLabApiClient from "./gitlabApiClient";
import fs from "fs";

const dotenv = require('dotenv')

export default async (since_date) => {
    console.log("Fetching GitLab event history since " + since_date.toISOString())

    if(fs.existsSync(`lib/gitlab_contribution_history_cache_1.json`)){
        return JSON.parse(fs.readFileSync(`lib/gitlab_contribution_history_cache_1.json`)).data
    }

    gitLabApiClient.init("1") // init client with [1,2] num from args

    let all_events_cache = []


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
                id: event.project_id,
                name: p.name,
                url: p.url,
                avatar: p.avatar,
                visibility: p.visibility,
            },
        }
    })
    const result = {
        date: moment().toISOString(),
        data: filtered,
    }
    fs.writeFileSync(
        `lib/gitlab_contribution_history_cache_1.json`,
        JSON.stringify(result))
    console.log('done.')
    return filtered

}
