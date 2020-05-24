import Section from './Section'

export default function SectionWithTitle ({ children , title}) {
  return (
    <>
      <Section>
        <div className="container">
          <div className={"title-row my-10"}>
            <h1 className={"text-5xl"}>{title}</h1>
          </div>
          <div className="content">
            {children}
          </div>
        </div>
      </Section>

    </>
  )
}
