import ExperienceItemTag from './ExperienceItemTag'

export default function ExperienceItemTags ({ className, tags }) {
  return (
    <>
      <div className={`tags text-sm ${className}`}>
        {/*{JSON.stringify(tags)}*/}
        {tags.length > 0 && tags.map((t, i) =>
          (t.tag && <ExperienceItemTag key={i} tag_color={t.color} tag={t.tag[0].text}/>)
        )}
        {/*<ExperienceItemTag tag_color={'primary'} tag={'proj'}/>*/}
        {/*<ExperienceItemTag tag_color={'red-500'} tag={'Test'}/>*/}
      </div>
    </>
  )
}
