import ExperienceItem from './ExperienceItem'
import React from 'react'

const Experiences = ({ className, data }) => {
  if (data) {
    return (
        <div className={`flex flex-col flex-wrap expierences ${className}`}>
          {data.edges.sort((a,b)=> (a.node.index > b.node.index) ? 1 : -1).map((i, k) =>
            <ExperienceItem key={k} data={i.node}/>
          )}
        </div>
    )
  }
  return <>...</>
}

export default Experiences
