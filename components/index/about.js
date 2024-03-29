"use client"
import Section from '../Section'
import PatternCreator from '../patterns/patternModule'
import React from 'react'
import Pattern from '../patterns/Pattern'
export default function About () {

  let patternDimensions = {
    h: 16,
    s: 20,
  }
  if (process.browser) {
    if (window.innerWidth < 768) {
      patternDimensions.h = 40
    }
  }

  return (
    <>
      <Section className={'bg-gray-200'} id="about">
        <div className="container mx-auto flex items-center justify-between">
          <div className="z-10 relative my-auto mx-auto inline-block">
            <div>
              <div className="flex flex-col lg:flex-row items-start py-16">
                <div className="rounded-full overflow-hidden w-1/4 lg:w-auto">
                  <img className="w-full lg:w-auto" src="me.jpg"
                       alt="Face of Hidde standing on cliff"/>
                </div>
                <div className="lg:ml-16 py-6 lg:py-0 max-w-lg">
                  <div className="title mb-5 mt-8">
                    <h2 className="leading-none">👋 hi,</h2>
                    <h2>nice to meet you.</h2>
                  </div>
                  <p className='mb-2'>I'm Hidde Schultze, a freelance lead
                    developer currently working from <a
                      href="https://nomadlist.com/utrecht"
                      style={{ textDecoration: 'none' }}
                      className="inline-block align-baseline px-2 py-1 bg-gray-300 rounded-sm leading-none hover:bg-gray-500"><span
                      className="tag-circle bg-green/80"></span> Utrecht
                      🚲</a></p>
                  <p className='mb-1'>As a developer I strive to create the best
                    experience for
                    the
                    end-user (B2C/B2B) by connecting multidisciplinary teams
                    with
                    UX, UI designers and front- and back-end developers. </p>
                  <p>I love working on projects that have a real and measurable
                    impact on the
                    society. Especially when it could improve healthcare or
                    change
                    the way people interact with radio broadcasts.</p>

                  <div className="social-links mt-6 mb-8">
                    <a className="btn btn-sm btn-square mr-3" target="_blank"
                       title="Go to my GitHub"
                       href="https://github.com/hiddehs"><span
                      className="hs-icon social-github"></span><span
                      className="hidden">GitHub</span></a>
                    <a className="btn btn-sm btn-square mr-3" target="_blank"
                       title="Go to my GitLab"
                       href="https://gitlab.com/hiddehs"><span
                      className="hs-icon social-gitlab"></span><span
                      className="hidden">GitLab</span></a>
                    <a className="btn btn-sm btn-square mr-3" target="_blank"
                       title="Go to my LinkedIn"
                       href="https://www.linkedin.com/in/hiddeschultze/"><span
                      className="hs-icon social-linkedin"></span><span
                      className="hidden">LinkedIn</span></a>
                    <a className="btn btn-sm btn-square mr-3" target="_blank"
                       title="Go to my Twitter"
                       href="https://twitter.com/hiddehs"><span
                      className="hs-icon social-twitter"></span><span
                      className="hidden">Twitter</span></a>
                    <a href="mailto:hi@hidde.me"
                       title="Email me at hi@hidde.me">hi@hidde.me</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pattern-background z-0">
          <Pattern h={patternDimensions.h} w={patternDimensions.s}></Pattern>
        </div>
      </Section>
      <style jsx>{`
      `}</style>
    </>
  )
}
