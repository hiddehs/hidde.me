import React, { useState, useEffect } from 'react'
import Section from '../Section'
import PatternBackground from '../PatternBackground'
import ContributionViewer from '../ContributionViewer'
import useSWR from 'swr'
import fetch from 'unfetch'
import AnchorLink from 'react-anchor-link-smooth-scroll'

const fetcher = url => fetch(url).then(r => r.json())
export default function HomeHero () {

  const [getWorkTitleIndex, setWorkTitleIndex] = useState(0)
  const [getContributionDay, setContributionDay] = useState(null)
  const [getGitStartMoment, setGitStartMoment] = useState(null)
  const { data } = useSWR(() => '/api/git?start=' + getGitStartMoment.unix(),
    fetcher)

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
    '@full stack',
  ]

  useEffect(() => {
    if (getWorkTitleIndex < workTitles.length - 1) {
      const interval = setInterval(() => {
        setWorkTitleIndex((getWorkTitleIndex) + 1)
      }, (1250 / workTitles.length))
      return () => clearInterval(interval)
    }
  })

  return (
    <Section className="hero bg-gray-200 z-0">
      <div className="bg-gray-200">
        <div
          className="container mx-auto flex items-start md:items-center justify-between">
          <div className="z-10 relative mt-12 md:my-auto inline-block">
            <h2 className={'leading-tight mb-4'}>Hidde Schultze <span
              className="hidden sm:inline">—</span><br/>
              <span
                className="primary-bg-accent">{workTitles[getWorkTitleIndex]}</span> developer.
            </h2>
            <h5 className={'font-medium text-gray-800 mb-4'}>Founder
              VisualRadioAssist &
              hidde.dev</h5>
            <AnchorLink href="#about" className="btn">about me</AnchorLink>
          </div>
          <PatternBackground data={data} setGitStartMoment={setGitStartMoment}
                             getContributionDay={getContributionDay}
                             getGitStartMoment={getGitStartMoment}
                             setContributionDay={setContributionDay}/>
          {/*<div className="relative" style={{ height: '600px', zIndex: -1 }}>*/}
          {/*  <img src="hero_bg.jpg" className="hero-bg" alt=""/>*/}
          {/*</div>*/}
        </div>

      </div>
      <div className="bg-gray-100">
        <div className="container">
          <div
            className="flex md:flex-row md:items-center flex-col justify-start">
            <div className={'title-row py-2 md:pr-10'}>
              <h3><span
                className='text-gray-400 hover:text-gray-800'>live.</span>work
              </h3>
            </div>
            {data && getContributionDay !== null && getContributionDay !== undefined &&
            <ContributionViewer
              contributions={data.contributions[getContributionDay]}/>
            }
          </div>
        </div>
      </div>


      <style jsx>{`
        
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
