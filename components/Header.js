import Link from 'next/link'
import React, { useState } from 'react'

export default function Header () {
  const [getLinksOpen, setLinksOpen] = useState(0)
  if (process.browser) {
    window.addEventListener('scroll', () => {
      if (getLinksOpen) setLinksOpen(0)
    })
  }
  return (
    <nav className="fixed w-full top-0 z-50">
      <div className="container my-2">
        <div
          className={`flex flex-wrap flex-row justify-between items-center ${getLinksOpen
            ? 'active'
            : ''}`}>
          <Link href={'/'}><a className={'logo'}><img height="31px"
                                                      src="logo.svg"
                                                      alt="hidde.me Logo"/></a></Link>
          <button onClick={() => {setLinksOpen(!getLinksOpen)}}
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
            <a className="text-3xl block font-bold w-full" href="#work">work</a>
            <a className="text-3xl block font-bold w-full"
               href="#exp">experience</a>
            <a className="text-3xl block font-bold w-full"
               href="#about">about</a>
          </div>

        </div>
      </div>
      <style jsx>{`
      `}</style>
    </nav>
  )
}
