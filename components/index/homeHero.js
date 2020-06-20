import Section from '../Section'
import PatternBackground from '../PatternBackground'

export default function HomeHero () {
  return (
    <Section className="hero bg-gray-300 z-0">

      <div className="container mx-auto flex items-center">
        <div className="z-10 relative my-auto inline-block">
          <h2 className={'leading-tight mb-4'}>Hidde Schultze —<br/>
            <span className="primary-bg-accent">@full_stack</span> developer.
          </h2>
          <h5 className={'font-medium text-gray-800 mb-4'}>Founder
            VisualRadioAssist &
            hidde.dev</h5>
          <a href="#about" className="btn">about me</a>
        </div>
        <PatternBackground/>
      </div>


      <style jsx>{`
        .container {
          margin-top: 63px;
        }
        .container{
          min-height: 600px;
        }
        // .wrapper .block{
        //   margin-left: 100px;
        // }
      `}</style>
    </Section>
  )
}
