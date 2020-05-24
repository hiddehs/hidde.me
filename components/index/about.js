import Section from '../Section'

export default function About () {
  return (
    <>
      <Section className={'bg-gray-400'}>
        <div className="container py-20">
          <div className="flex">
            <div>
              <h2>hi 👋🏻,</h2>
              <h2>nice to meet you.</h2>
              <p>I'm Hidde Schultze, ...</p>
              <div className="social-links">
                <a href="/github"></a>
                <a href="/linkedin"></a>
                <a href="/twitter"></a>
                <a href="/instagram"></a>
            </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
