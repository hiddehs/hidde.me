import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'

const standaloneGitHubApolloClient = () => {
  const client = new ApolloClient({
    link: new HttpLink({
      uri: 'https://api.github.com/graphql',
      headers: {
        authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
      },
    }),
    cache: new InMemoryCache(),
  })
  const query = async (gql, variables = {}) => {
    return await client.query({
      query: gql,
      variables: variables,
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'network-only',
    })
  }
  return { query }
}

export default standaloneGitHubApolloClient
