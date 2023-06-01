import '../css/app.scss'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Head from 'next/head'
import {Analytics} from "@vercel/analytics/react";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp ({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>hidde.me – hidde schultze – full stack dev</title>
        <meta name="og:type" content="website"/>
        <meta name="description" content="Hidde Schultze is a full stack developer from the Netherlands, founder of VisualRadioAssist and working on several (e)health projects."/>

        <meta name="og:title" content="hidde schultze – full stack dev"/>
        <meta name="keywords" content="hidde, schultze, visual radio, visual radio assist, visualradioassist, drimpy, hidde.dev, ehealth, health, corona app, backend minvws, brain bakery website"/>
        <meta name="og:url" content="https://hidde.me/"/>
        <meta name="og:description" content="Hidde Schultze is a full stack developer from the Netherlands, founder of VisualRadioAssist and working on several (e)health projects."/>
        <meta name="og:image" content=""/>

        <script async src="https://www.googletagmanager.com/gtag/js?id=G-59WQ8WPRZK"></script>
        <script dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-59WQ8WPRZK');
        `}}
        />
      </Head>
      <Header/>
      <Component className={'mt-20'} {...pageProps} />
      <Analytics />
      <Footer/>
    </>
  )
}
