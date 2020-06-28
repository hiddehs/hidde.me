import '../css/app.scss'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Head from 'next/head'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp ({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>hidde.me</title>

        <script async
                src="https://www.googletagmanager.com/gtag/js?id=UA-76194988-1"/>

        <script dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'UA-76194988-1');
         `,
        }}
        />
      </Head>
      <Header/>
      <Component className={'mt-20'} {...pageProps} />
      <Footer/>
    </>
  )
}
