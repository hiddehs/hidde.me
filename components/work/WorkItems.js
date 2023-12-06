import WorkItem from './WorkItem'

function WorkItems ({ className, data }) {
  if (data) {
    return (
      <>
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden work-items ${className}`}>
          {data.edges.sort(
            (a, b) => (a.node.home_index > b.node.home_index) ? 1 : -1).
            map((item, k) =>
              <WorkItem data={item.node} key={k}/>,
            )}
        </div>
      </>
  )
  }
  return <>...</>
}

export default WorkItems
