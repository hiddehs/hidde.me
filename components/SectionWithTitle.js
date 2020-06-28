import Section from './Section'

export default function SectionWithTitle ({ children, className, title, subtitle = null }) {
  return (
    <>
      <Section className={className} id={title.toLowerCase()}>
        <div className="container">
          <div className={'title-row py-10'}>
            <h2>{subtitle
              ? <span className='text-gray-400 hover:text-gray-800'>{subtitle}.</span>
              : ''}{title}</h2>
          </div>
          <div className="content">
            {children}
          </div>
        </div>
      </Section>

    </>
  )
}
