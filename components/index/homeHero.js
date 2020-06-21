import React, { useState, useEffect } from 'react'
import Section from '../Section'
import PatternBackground from '../PatternBackground'

export default function HomeHero () {

  const [getWorkTitleIndex, setWorkTitleIndex] = useState(0)

  const workTitles = [
    '@ux/ui',
    '@ehealth',
    '@front-end',
    '@ne/uxt.js',
    '@vue.js',
    '@react',
    '@back-end',
    '@laravel',
    '@node.js',
    '@full_stack',
  ]

  useEffect(() => {
    if (getWorkTitleIndex < workTitles.length - 1) {
      const interval = setInterval(() => {
        setWorkTitleIndex((getWorkTitleIndex) + 1)
      }, (1000 / workTitles.length))
      return () => clearInterval(interval)
    }
  })

  return (
    <Section className="hero bg-gray-200 z-0">

      <div className="container mx-auto flex items-center justify-between">
        <div className="z-10 relative my-auto inline-block">
          <h2 className={'leading-tight mb-4'}>Hidde Schultze —<br/>
            <span
              className="primary-bg-accent">{workTitles[getWorkTitleIndex]}</span> developer.
          </h2>
          <h5 className={'font-medium text-gray-800 mb-4'}>Founder
            VisualRadioAssist &
            hidde.dev</h5>
          <a href="#about" className="btn">about me</a>
        </div>
        <PatternBackground/>
        <div className="relative" style={{ height: '600px', zIndex: -1 }}>
          <img src="hero_bg.jpg" className="hero-bg" alt=""/>
        </div>
      </div>


      <style jsx>{`
        .container {
          margin-top: 63px;
        }
        .container{
          min-height: 600px;
        }
        .hero-bg{
          position: absolute;
          right: 0;
          top: 0;
          height: 110%;
          z-index: -1;
          opacity: .30;
          mix-blend-mode: hard-light;
          margin-right: -36px;
        }
        // .wrapper .block{
        //   margin-left: 100px;
        // }
      `}</style>
    </Section>
  )
}
