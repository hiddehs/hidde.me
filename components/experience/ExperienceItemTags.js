import ExperienceItemTag from './ExperienceItemTag'

export default function ExperienceItemTags({className, tags}){
  return (
    <>
      <div className={`tags text-sm ${className}`}>
        <ExperienceItemTag tag_color={"blue-900"} tag={"audit"}/>
        <ExperienceItemTag tag_color={"primary"} tag={"proj"}/>
        <ExperienceItemTag tag_color={"red-500"} tag={"Test"}/>
      </div>
    </>
  )
}
