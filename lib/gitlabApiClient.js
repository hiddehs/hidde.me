const axios = require('axios')
const url = require('url')
const ai = axios.create({
  timeout: 30000,
  headers: { 'PRIVATE-TOKEN': process.env.GITLAB_ACCESS_TOKEN_1 },
})

const base = process.env.GITLAB_BASE_URL_1

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
      api = base + api
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
      api = base + api
    }
    let urlInfo = url.parse(api, true)
    let queryData = urlInfo.query
    // console.log(queryData)
    let baseApi =
      Object.keys(queryData).length === 0
        ? api
        : urlInfo.href.substring(0, urlInfo.href.indexOf('?'))
    console.log(queryData)
    if (!queryData.per_page) {
      queryData['per_page'] = 100
    }
    api = createUrl(baseApi, queryData)
    console.log('Calling ', api)
    let resp = await ai.get(api)
    let nextPage = []
    if (resp.headers['x-next-page']) {
      console.log('Next page ', resp.headers['x-next-page'])
      queryData['page'] = resp.headers['x-next-page']
      nextPage = await getAll(createUrl(baseApi, queryData))
    }
    let allData = resp.data.concat(nextPage)
    console.log('Data size', allData.length)
    return allData
  } catch (error) {
    console.error(error)
    throw error
  }
}

module.exports.getAll = getAll
module.exports.get = get
