import WorkItem from './WorkItem'
import gql from 'graphql-tag'
import { useLazyQuery, useQuery } from '@apollo/react-hooks'


function WorkItems ({ className, data }) {
  if (data) {
    return (
      <>
        <div
          className={`flex flex-row items-stretch flex-nowrap overflow-hidden work-items ${className}`}>
          {data.edges.map((item, k) =>
            <WorkItem data={item.node} key={k}/>,
          )}
        </div>
      </>
    )
  }
  return <>...</>
}

export default WorkItems

// export default function WorkItems({className,items}){
//   return (
//     <>
//       <div className={`flex flex-row items-start flex-wrap work-items ${className}`}>
//         <WorkItem/>
//         <WorkItem/>
//         <WorkItem/>
//       </div>
//     </>
//   )
// }
