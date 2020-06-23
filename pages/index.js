import Head from 'next/head'
import Layout from '../components/Layout'
import HomeHero from '../components/index/homeHero'
import Work from '../components/index/work'
import Expierence from '../components/index/experience'
import About from '../components/index/about'
import gql from 'graphql-tag'
import { getStandaloneApolloClient } from '../lib/prismicApolloClient'

const GET_INDEX_DATA = gql`
    query {
        allWorks{
            edges{
                node{
                    project_title
                    description_short
                    image_fallback
                    home_index
                    video {
                        ... on _FileLink{
                            url
                        }
                    }
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
                    index
                    title
                    company
                    description
                    logo
                    start
                    end
                    company_link{
                        ... on _ExternalLink {
                            url
                        }
                    }
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
      <HomeHero></HomeHero>
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
