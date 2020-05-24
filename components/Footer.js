import Link from 'next/link'

const year = (new Date()).getFullYear()

export default function Footer () {
  return (
    <>
      <footer className="text-sm w-full bg-white">
        <div className="container my-6">
          <div className="flex flex-row justify-between items-center">
            <div className="col w-1/5">
              <img src="icon.svg" height="31px" alt="hidde.me Logo"/>
            </div>
            <div className="col w-3/5 text-center">
              <div className={'text-center'}>
                <Link href="/terms">
                  <a>Terms and Conditions</a>
                </Link>
                <span className="spacer mx-3">––</span>
                <Link href="/privacy">
                  <a>Privacy</a>
                </Link>
              </div>
              <div className="text-center">
                All rights reserved © {year}
              </div>

            </div>
            <div className="col w-1/5 text-right">
              <a href="" title={"Go to Top"} className={"btn btn-outline-primary"}>
                <span className="icon">/\</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}