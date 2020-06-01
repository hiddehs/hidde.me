import ExperienceItemTag from './ExperienceItemTag'

export default function ExperienceItemTags ({ className, tags }) {
  return (
    <>
      <div className={`tags text-sm ${className}`}>
        {tags.map((t, i) =>
          <ExperienceItemTag key={i} tag_color={t.color} tag={t.tag[0].text}/>,
        )}
        {/*<ExperienceItemTag tag_color={'primary'} tag={'proj'}/>*/}
        {/*<ExperienceItemTag tag_color={'red-500'} tag={'Test'}/>*/}
      </div>
    </>
  )
}
