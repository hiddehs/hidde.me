import Link from 'next/link'
import AnchorLink from 'react-anchor-link-smooth-scroll'

const year = (new Date()).getFullYear()

export default function Footer () {
  return (
    <>
      <footer className="text-sm w-full bg-white">
        <div className="container my-6">
          <div className="flex flex-row justify-between items-center">
            <div className="col w-1/5">
              <Link href={'/'}>
                <a><img src="icon.svg" height="31px" alt="hidde.me Logo"/></a>
              </Link>
            </div>
            <div className="col w-3/5 text-center">
              {/*<div className={'text-center'}>*/}
              {/*  <Link href="/terms">*/}
              {/*    <a>Terms and Conditions</a>*/}
              {/*  </Link>*/}
              {/*  <span className="spacer mx-3">––</span>*/}
              {/*  <Link href="/privacy">*/}
              {/*    <a>Privacy</a>*/}
              {/*  </Link>*/}
              {/*</div>*/}
              <div className="text-center">
                <p>All rights reserved © {year}</p>
                <p className="text-sm text-gray-600">KVK 67988695 – <a className="text-gray-600" target="_blank"
                  href="https://rusty.2k16.hiddeschultze.nl">rusty.2k16.hiddeschultze.nl</a> – <a
                  href="https://github.com/hiddehs/hidde.me">github.repo</a></p>
              </div>

            </div>
            <div className="col w-1/5 text-right">
              <AnchorLink href="#hero" title={'Go to Top'}
                 className='btn btn-outline-primary btn-square'>
                <span className="hs-icon arrow-up"></span>
              </AnchorLink>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
