export default function Section(props) {
  return (
    <section className={`section w-full relative ${props.className}`} id={props.id}>
        {props.children}
    </section>
  )
}
