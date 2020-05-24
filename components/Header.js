import Link from 'next/link'

export default function Header() {
  return (
    <nav className="fixed w-full top-0">
      <div className="container my-4">
        <div className="flex flex-row justify-between">
          <Link href={"/"}><a><img src="logo.svg" alt="hidde.me Logo"/></a></Link>
          <div className="links">
            <a href="#work">work</a>
            <a href="#exp">experience</a>
            <a href="#about">about</a>
          </div>
        </div>
      </div>
      <style jsx>{`
        .links a{
          margin-left: 1.25rem;
        }
      `}</style>
    </nav>
  );
}
