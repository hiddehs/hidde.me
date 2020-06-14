import Section from '../Section'
import PatternBackground from '../PatternBackground'

export default function HomeHero () {
  return (
    <Section className="hero bg-gray-300 z-0">
      <div className="container z-10 relative">
        <div className="flex flex-wrap flex-row items-center">
          <div className="col w-full lg:w-1/2">
            <h2 className={'leading-tight mb-4'}>Hidde Schultze —<br/>
              <span className="primary-bg-accent">@full_stack</span> developer.
            </h2>
            <h5 className={'font-medium text-gray-800 mb-4'}>Founder
              VisualRadioAssist &
              hidde.dev</h5>
            <a href="#about" className="btn">about me</a>
          </div>

        </div>
      </div>
      <PatternBackground/>
      <style jsx>{`
        .container {
          margin-top: 63px;
        }
        .flex{
          min-height: 600px;
        }
      `}</style>
    </Section>
  )
}
