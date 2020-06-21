import ExperienceItem from './ExperienceItem'

const Experiences = ({ className, data }) => {
  if (data) {
    return (
        <div className={`flex flex-col flex-wrap expierences ${className}`}>
          {data.edges.sort(i => i.node.index).map((i, k) =>
            <ExperienceItem key={k} data={i.node}/>
          )}
        </div>
    )
  }
  return <>...</>
}

export default Experiences
