export default function Section(props) {
  return (
    <section className={`section w-full ${props.className}`}>
        {props.children}
    </section>
  )
}
