import Link from 'next/link'

export default function Header() {
  return (
    <nav className="fixed w-full top-0 z-50">
      <div className="container my-2">
        <div className="flex flex-wrap flex-row justify-between">
          <Link href={"/"}><a className={"logo"}><img height="31px" src="logo.svg" alt="hidde.me Logo"/></a></Link>
          <div className="links hidden sm:flex flex-wrap flex-row items-center">
            <a href="#work">work</a>
            <a href="#exp">experience</a>
            <a href="#about">about</a>
          </div>
        </div>
      </div>
      <style jsx>{`
      `}</style>
    </nav>
  );
}
