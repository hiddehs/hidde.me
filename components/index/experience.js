"use client"
import SectionWithTitle from '../SectionWithTitle'
import Experiences from '../experience/Experiences'

export default function Expierence({data}) {
  return (
    <>
      <SectionWithTitle title={"experience"} className="md:mb-20">
        <Experiences data={data}/>
        {/*<ExperienceItem></ExperienceItem>*/}
      </SectionWithTitle>
    </>
  )
}
