import ApolloClient from 'apollo-client'
import { PrismicLink } from 'apollo-link-prismic'
import { InMemoryCache } from 'apollo-cache-inmemory'

export async function getStandaloneApolloClient () {
  return new ApolloClient({
    link: PrismicLink({
      uri: 'https://hidde-me.cdn.prismic.io/graphql',
      accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    }),
    cache: new InMemoryCache(),
  })
}
