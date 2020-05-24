import '../css/app.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Head from 'next/head'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp ({ Component, pageProps }) {
  return (
    <>
      <Head><title>hidde.me</title></Head>
      <Header/>
      <Component className={"mt-20"} {...pageProps} />
      <Footer/>
    </>
  )
}
