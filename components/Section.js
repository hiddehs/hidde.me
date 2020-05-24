export default function Section(props) {
  return (
    <div className={`section w-full ${props.className}`}>
        {props.children}
    </div>
  )
}
