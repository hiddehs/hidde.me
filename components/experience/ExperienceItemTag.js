export default function ExperienceItemTag ({ className, tag_color, tag }) {
  return (
    <>
      <span className="inline-block mr-3 px-2 mb-3 py-1 bg-gray-200 align-middle rounded-sm leading-none hover:bg-gray-500  transition duration-100 select-none"><i
        className={`tag-circle bg-${tag_color}`}></i>
        {tag}</span>
      <style jsx>
        {`
          .tag-circle{
             
          }
        `}
      </style>
    </>
  )
}
