import Head from 'next/head'
import Layout from '../components/Layout'
import Hero from '../components/index/hero'
import Work from '../components/index/work'
import Expierence from '../components/index/experience'
import About from '../components/index/about'
import withApollo from '../lib/apollo'
import gql from 'graphql-tag'
import { useLazyQuery } from '@apollo/react-hooks'
import { getStandaloneApolloClient } from '../lib/apollo_standalone'

const GET_INDEX_DATA = gql`
    query {
        allWorks{
            edges{
                node{
                    project_title
                    description_short
                    image_fallback
                    link {
                        ... on _ExternalLink{
                            url
                        }
                    }
                    _meta{
                        id
                    }
                }
            }
        }
        allExperiences{
            edges{
                node{
                    title
                    company
                    description
                    logo
                    start
                    end
                    tags{
                        tag
                        color
                    }
                }
            }
        }        
    }
`

const Home = ({ data }) => {
  return (
    <Layout>
      <Hero></Hero>
      <Work data={data.allWorks}></Work>
      <Expierence data={data.allExperiences}></Expierence>
      <About></About>
    </Layout>
  )
}

export async function getStaticProps () {

  const client = await getStandaloneApolloClient()
  let result = await client.query({
    query: GET_INDEX_DATA,
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only'
  })
  return {
    props: {
      data: result.data
    },
  }
}

export default Home
