import ExperienceItem from './ExperienceItem'

export default function Expierences({items=[]}) {
  return (
    <>
      <div className="flex flex-col flex-wrap expierences">
        <ExperienceItem/>
        <ExperienceItem/>
        <ExperienceItem/>
      </div>
    </>
  )
}
