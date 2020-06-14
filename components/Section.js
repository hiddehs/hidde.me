export default function Section(props) {
  return (
    <section className={`section w-full relative ${props.className}`}>
        {props.children}
    </section>
  )
}
