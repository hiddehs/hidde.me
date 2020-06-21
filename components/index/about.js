import Section from '../Section'
import React from 'react'
import PatternCreator from '../patterns/patternModule'

export default function About () {
  return (
    <>
      <Section className={'bg-gray-200'}>
        <div className="container mx-auto flex items-center justify-between">
          <div className="z-10 relative my-auto mx-auto inline-block">
            <div>
              <div className="flex flex-row items-start py-16">
                <div className="rounded-full overflow-hidden">
                  <img src="me.jpg" alt="Person (Hidde) standing on cliff"/>
                </div>
                <div className="ml-16 max-w-lg">
                  <div className="title mb-5 mt-8">
                    <h2 className="leading-none">👋 hi,</h2>
                    <h2>nice to meet you.</h2>
                  </div>
                  <p className='mb-2'>I'm Hidde Schultze, a full stack
                    developer from <a
                      href="https://nomadlist.com/zwolle"
                      style={{ textDecoration: 'none' }}
                      className="inline-block align-baseline px-2 py-1 bg-gray-300 rounded-sm leading-none hover:bg-gray-500"><span
                      className="tag-circle bg-green-400"></span> Zwolle
                      🇳🇱</a></p>
                  <p className='mb-1'>As a developer I strive to create the best experience for
                    the
                    end-user (B2C/B2B) by connecting multidisciplinary teams
                    with
                    UX, UI designers and front- and back-end developers. </p>
                  <p>I love working on projects that have a real impact on the
                    society. Especially when it can improve healthcare or change
                    the way people interact with radio broadcasts.</p>
                  <div className="social-links mt-6 mb-8">
                    <a className="btn btn-sm btn-square mr-3" target="_blank"
                       href="https://github.com/hiddehs"><span
                      className="hs-icon social-github"></span></a>
                    <a className="btn btn-sm btn-square mr-3" target="_blank"
                       href="https://gitlab.com/hiddehs"><span
                      className="hs-icon social-gitlab"></span></a>
                    <a className="btn btn-sm btn-square mr-3" target="_blank"
                       href="https://linkedin.com/hiddeschultze"><span
                      className="hs-icon social-linkedin"></span></a>
                    <a className="btn btn-sm btn-square mr-3" target="_blank"
                       href="https://twitter.com/hiddehs"><span
                      className="hs-icon social-twitter"></span></a>
                    <a href="mailto:hi@hidde.me" className="">hi@hidde.me</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pattern-background z-0">
          {PatternCreator(16).createPattern(12)}
        </div>
      </Section>
      <style jsx>{`
      `}</style>
    </>
  )
}
