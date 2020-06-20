import WorkItem from './WorkItem'

function WorkItems ({ className, data }) {
  if (data) {
    return (
      <>
        <div
          className={`flex flex-row items-stretch flex-nowrap overflow-hidden work-items ${className}`}>
          {data.edges.sort(i => i.node.home_index).map((item, k) =>
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
