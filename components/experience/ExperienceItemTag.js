const getColor = (tag_color) => {
    switch (tag_color.split("-")[0]) {
        case "blue":
            return "bg-blue"
            break;
        case "orange":
            return "bg-orange"
            break;
        case "red":
            return "bg-red"
            break;
        case "green":
            return "bg-green"
            break;
    }
    return `bg-${tag_color}`
}

export default function ExperienceItemTag({className, tag_color, tag}) {
    return (
        <>
      <span
          className="inline-block mr-3 px-2 mb-3 py-1 bg-gray-200 align-middle rounded-sm leading-none hover:bg-gray-500  transition duration-100 select-none"><i
          className={`tag-circle ${getColor(tag_color)}`}></i>
          {tag}</span>
        </>
    )
}
