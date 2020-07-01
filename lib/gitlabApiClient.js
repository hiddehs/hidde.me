const axios = require('axios')
const url = require('url')
let ai

let config ={
  GITLAB_INSTANCE:"",
  GITLAB_ACCESS_TOKEN:"",
  GITLAB_BASE_URL:""
}

const init = (instance) => {
  config.GITLAB_INSTANCE = String(instance)
  if (config.GITLAB_INSTANCE === '1') {
    config.GITLAB_ACCESS_TOKEN = process.env.GITLAB_ACCESS_TOKEN_1
    config.GITLAB_BASE_URL = process.env.GITLAB_BASE_URL_1
  } else if (config.GITLAB_INSTANCE === '2') {
    config.GITLAB_ACCESS_TOKEN = process.env.GITLAB_ACCESS_TOKEN_2
    config.GITLAB_BASE_URL = process.env.GITLAB_BASE_URL_2
  }
  ai = axios.create({
    timeout: 30000,
    headers: { 'PRIVATE-TOKEN': config.GITLAB_ACCESS_TOKEN },
  })
}

const createUrl = (api, queryData) =>
  api +
  '?' +
  Object.keys(queryData).reduce((acc, val) => {
    if (acc === '') {
      return `${val}=${queryData[val]}`
    }
    return `${val}=${queryData[val]}&${acc}`
  }, '')

const get = async api => {
  try {
    if (!api.startsWith('http')) {
      api = config.GITLAB_BASE_URL + api
    }
    let resp = await ai.get(api)
    return resp.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

const getAll = async api => {
  try {
    if (!api.startsWith('http')) {
      api = config.GITLAB_BASE_URL + api
    }
    let urlInfo = url.parse(api, true)
    let queryData = urlInfo.query

    let baseApi =
      Object.keys(queryData).length === 0
        ? api
        : urlInfo.href.substring(0, urlInfo.href.indexOf('?'))

    if (!queryData.per_page) {
      queryData['per_page'] = 100
    }
    api = createUrl(baseApi, queryData)

    let resp = await ai.get(api)
    let nextPage = []
    if (resp.headers['x-next-page']) {
      console.log('Next page ', resp.headers['x-next-page'])
      queryData['page'] = resp.headers['x-next-page']
      nextPage = await getAll(createUrl(baseApi, queryData))
    }
    let allData = resp.data.concat(nextPage)
    return allData
  } catch (error) {
    console.error(error)
    throw error
  }
}

const getProjects = async () => {
  const fetchProjects = async () => {
    let projects = []
    let resp = await getAll('projects?per_page=100&owned=1')
    resp.forEach((p) => {
      projects[p.id] = {
        name: p.name,
        url: p.web_url,
        avatar: p.avatar_url,
        visibility: p.visibility,
      }
    })
    return projects
  }
  return await fetchProjects()
}

module.exports.config = config
module.exports.init = init
module.exports.getProjects = getProjects
module.exports.getAll = getAll
module.exports.get = get
