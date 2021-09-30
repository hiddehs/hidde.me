import Link from 'next/link'
import React, { useState } from 'react'
import AnchorLink from 'react-anchor-link-smooth-scroll'

export default function Header () {
  const [getLinksOpen, setLinksOpen] = useState(0)
  if (process.browser) {
    window.addEventListener('scroll', () => {
      if (getLinksOpen) setLinksOpen(0)
    })
  }

  const links = [
    'work',
    'experience',
    'about',
  ]

  return (
    <nav className="fixed w-full top-0 z-50">
      <div className="awesome-tnw text-white px-4 py-2 text-center font-medium">
        <p>currently 📍 located at TNW 2021, we've talked? <a
          href="https://www.linkedin.com/in/hiddeschultze/"> let's connect @ LinkedIn</a>!</p>
      </div>

      <div className="container my-2">
        <div
          className={`flex flex-wrap flex-row justify-between items-center ${getLinksOpen
            ? 'active'
            : ''}`}>
          <Link href={'/'}><a className={'logo'}><img height="31px"
                                                      src="logo.svg"
                                                      alt="hidde.me Logo"/></a></Link>
          <button onClick={() => {setLinksOpen(!getLinksOpen)}} aria-label={getLinksOpen ? 'Open menu' : 'Close menu'}
                  className={`leading-none hamburger hamburger--minus sm:hidden ${getLinksOpen
                    ? 'is-active'
                    : ''}`}>
            <div className="hamburger-box">
              <div className="hamburger-inner"></div>
            </div>
          </button>
          <div className={`links ${getLinksOpen
            ? 'flex'
            : 'hidden'} sm:flex flex-wrap flex-row items-center py-3 md:py-0`}>

            {links.map(l => {
              return (<AnchorLink offset={50} className="text-3xl text-gray-800 sm:my-0 my-2 block font-bold w-full"
                                  href={'#' + l}>{l}</AnchorLink>)
            })}

            {/*<AnchorLink offset={50} className="text-3xl block font-bold w-full"*/}
            {/*   href="#experience">experience</AnchorLink>*/}
            {/*<AnchorLink offset={50} className="text-3xl block font-bold w-full"*/}
            {/*   href="#about">about</AnchorLink>*/}
          </div>

        </div>
      </div>
      <style jsx>{`
        .awesome-tnw {
          backdrop-filter: blur(8px);
          background-position:center;
          background-size: auto 100%;
          background-image: url(https://earlybird.thenextweb.com/assets/2.0/custom/tnw/bg-nav-desktop.jpg);
        }
      `}</style>
    </nav>
  )
}
