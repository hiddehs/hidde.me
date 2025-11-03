"use client"
import React, {useState} from 'react'
import Section from '../Section'
import PatternBackground from '../PatternBackground'
import ContributionViewer from '../ContributionViewer'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import WorkTitles from '../work/WorkTitles'

export default function HomeHero({git}) {
    const [getContributionDay, setContributionDay] = useState(null)
    const [getGitStartMoment, setGitStartMoment] = useState(null)

    return (
        <Section className="hero bg-gray-200 z-0" id="hero">
            <div className="bg-gray-200 relative">
                <div
                    className="container mx-auto flex items-start md:items-center justify-between">
                    <div className="z-10 relative mt-32 md:my-auto inline-block">
                        <h2 className={'leading-tight mb-4'}>Hidde Schultze<br/>
                            <span
                                className="primary-bg-accent"><WorkTitles/></span> developer.
                        </h2>
                        <h5 className={'font-medium text-gray-800 mb-4'}>& technical founder
                            Visual Radio Assist</h5>
                        <AnchorLink href="#about" className="btn">
                            {/*<span*/}
                            {/*  className="hs-icon link-arrow-right hover:mr-1 hover:inline opacity-0 hover:opacity-100"></span>*/}
                            about
                            me</AnchorLink>
                    </div>
                </div>
                <PatternBackground data={git}
                                   setGitStartMoment={setGitStartMoment}
                                   getContributionDay={getContributionDay}
                                   getGitStartMoment={getGitStartMoment}
                                   setContributionDay={setContributionDay}/>

            </div>
            <div className="bg-gray-100">
                <div className="container">
                    <div
                        className="flex md:flex-row md:items-center flex-col justify-start">
                        <div className={'title-row py-2 md:pr-10'}>
                            <h3 className="relative flex items-center">
                <span
                    className="text-gray-400 hover:text-gray-800">live.</span>work
                                <span className="flex relative h-3 w-3 ml-3">
  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-80"></span>
  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
</span>
                            </h3>
                        </div>
                        {git && getContributionDay !== null && getContributionDay !==
                            undefined &&
                            <ContributionViewer
                                contributions={git.contributions[getContributionDay]}/>
                        }
                    </div>
                </div>
            </div>


            <style jsx>{`

              .hero-bg {
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
