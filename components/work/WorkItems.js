import WorkItem from './WorkItem'

function WorkItems ({ className, data }) {
  if (data) {
    return (
      <>
        <div
          className={`flex flex-row overflow-hidden work-items ${className}`}>
          {data.edges.sort((a,b)=> (a.node.home_index > b.node.home_index) ? 1 : -1).map((item, k) =>
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
