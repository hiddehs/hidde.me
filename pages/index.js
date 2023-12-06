import Layout from '../components/Layout'
import HomeHero from '../components/index/homeHero'
import Work from '../components/index/work'
import Expierence from '../components/index/experience'
import About from '../components/index/about'
import gql from 'graphql-tag'
import {getStandaloneApolloClient} from '../lib/prismicApolloClient'
// import git from "../lib/git";
import moment from 'moment'
import git from '../lib/git'

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

const Home = ({works, experiences, git}) => {
    return (
        <Layout>
            <HomeHero git={git}/>
            <Work data={works}/>
            <Expierence data={experiences}/>
            <About/>
        </Layout>
    )
}

export async function getStaticProps() {
    const gitContributions = await git(moment().add(-200, "day"))
    const client = await getStandaloneApolloClient()
    let result = await client.query({
        query: GET_INDEX_DATA,
        notifyOnNetworkStatusChange: true,
        fetchPolicy: 'network-only'
    })
    console.log(git)
    return {
        props: {
            works: result.data.allWorks,
            experiences: result.data.allExperiences.edges.sort((a,b)=> (a.node.index > b.node.index) ? 1 : -1),
            git: gitContributions
        },
    }
}

export default Home
