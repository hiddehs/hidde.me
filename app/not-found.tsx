import Link from 'next/link'

export default function Custom404() {
  return (
    <>
      <div className="container mt-20">
        <h1 style={{fontSize:"8rem"}} className="font-bold">404</h1>
        <p className={"mb-4"}>Page not found.</p>
        <Link className="btn btn-outline" href={"/"} >
          go back to home.`
        </Link>
      </div>
    </>
  )
}
