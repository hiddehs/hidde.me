import Section from '../Section'

export default function Hero () {
  return (
    <Section className="hero bg-gray-100">
      <div className="container">
        <div className="flex flex-wrap flex-row items-center">
          <div className="col w-full lg:w-1/2">
            <h1 className={'text-5xl leading-tight mb-4'}>Hidde Schultze —<br/>
              <span className="function">creative</span> developer.</h1>
            <h3 className={'text-gray-700 mb-4'}>Founder VisualRadioAssist &
              hidde.dev</h3>
            <a href="#work" className="btn">view my work</a>
          </div>
          <div className="col w-full lg:w-1/2 text-right">
            -plaatje-
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
