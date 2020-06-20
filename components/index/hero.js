import Section from '../Section'

export default function Hero () {
  return (
    <Section className="hero bg-gray-300">
      <div className="container">
        <div className="flex flex-wrap flex-row items-center">
          <div className="col w-full lg:w-1/2">
            <h2 className={'leading-tight mb-4'}>Hidde Schultze —<br/>
              <span className="function">full_stack</span> developer.</h2>
            <h5 className={'font-medium text-gray-800 mb-4'}>Founder VisualRadioAssist &
              hidde.dev</h5>
            <a href="#work" className="btn">view work</a>
          </div>
          <div className="col w-full lg:w-1/2 text-right">
            <video loop playsInline={true} autoPlay={true} muted={true} src="hero.mov"></video>
          </div>
        </div>
      </div>
      <style jsx>{`
        .container {
          margin-top: 63px;
        }
        .flex{
          min-height: 570px;
        }
      `}</style>
    </Section>
)
}
