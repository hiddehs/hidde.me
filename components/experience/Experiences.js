import ExperienceItem from './ExperienceItem'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

const Experiences = ({ className, data }) => {
  if (data) {
    return (
        <div className={`flex flex-col flex-wrap expierences ${className}`}>
          {data.edges.map((i, k) =>
            <ExperienceItem key={k} data={i.node}/>
          )}
          {/*<ExperienceItem/>*/}
          {/*<ExperienceItem/>*/}
        </div>
    )
  }
  return <>...</>
}

export default Experiences
