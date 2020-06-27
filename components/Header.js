import Link from 'next/link'
import React, { useState } from 'react'

export default function Header () {
  const [getLinksOpen, setLinksOpen] = useState(0)

  return (
    <nav className="fixed w-full top-0 z-50">
      <div className="container my-2">
        <div className={`flex flex-wrap flex-row justify-between ${getLinksOpen ? 'active' : ''}`}>
          <Link href={'/'}><a className={'logo'}><img height="31px"
                                                      src="logo.svg"
                                                      alt="hidde.me Logo"/></a></Link>
          <div className={`links ${getLinksOpen ? 'flex':'hidden'} sm:flex flex-wrap flex-row items-center`}>
            <a href="#work">work</a>
            <a href="#exp">experience</a>
            <a href="#about">about</a>
          </div>
          <button onClick={()=>{setLinksOpen(!getLinksOpen)}} className={`hamburger hamburger--minus sm:hidden ${getLinksOpen ? 'is-active' : ''}`}
                  type="button">
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </button>
        </div>
      </div>
      <style jsx>{`
      `}</style>
    </nav>
  )
}
