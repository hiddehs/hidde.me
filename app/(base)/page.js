import HomeHero from '@/components/index/homeHero'
import Work from '@/components/index/work'
import Expierence from '@/components/index/experience'
import About from '@/components/index/about'
import gql from 'graphql-tag'
import { getStandaloneApolloClient } from '../../lib/prismicApolloClient'
import moment from 'moment'
import git from '../../lib/git'

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
export default async function Index () {
  const gitContributions = await git(moment().add(-200, 'day'))
  const client = await getStandaloneApolloClient()
  let result = await client.query({
    query: GET_INDEX_DATA,
    fetchPolicy: 'network-only',
  })
  const works = result.data.allWorks
  const experiences = result.data.allExperiences.edges.sort(
    (a, b) => (a.node.index > b.node.index) ? 1 : -1)

  return (
    <div className={'content'}>
      <HomeHero git={gitContributions}/>
      <Work data={works}/>
      <Expierence data={experiences}/>
      <About/>
    </div>
  )
}
