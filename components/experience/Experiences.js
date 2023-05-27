import ExperienceItem from './ExperienceItem'
import React from 'react'

const Experiences = ({ className, data }) => {
  if (data) {
    return (
        <div className={`flex flex-col flex-wrap expierences ${className}`}>
          {data.map((i, k) =>
            <ExperienceItem key={k} data={i.node}/>
          )}
        </div>
    )
  }
  return <>...</>
}

export default Experiences
