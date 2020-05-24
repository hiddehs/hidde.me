import Section from './Section'

export default function SectionWithTitle ({ children, className , title}) {
  return (
    <>
      <Section className={className}>
        <div className="container">
          <div className={"title-row my-10"}>
            <h2>{title}</h2>
          </div>
          <div className="content">
            {children}
          </div>
        </div>
      </Section>

    </>
  )
}
