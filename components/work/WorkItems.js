import WorkItem from './WorkItem'

export default function WorkItems({className,items}){
  return (
    <>
      <div className={`flex flex-row items-start flex-wrap work-items ${className}`}>
        <WorkItem/>
        <WorkItem/>
        <WorkItem/>
      </div>
    </>
  )
}
