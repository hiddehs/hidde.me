import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {

  render () {
    return (
      <Html lang={"en"}>
        <Head>

          <link rel="icon" href="/favicon.ico"/>
          {/*<link rel="preload" href="fonts/font-75Bd.woff2" as="font"*/}
          {/*      type="font/woff2"/>*/}
          {/*<link rel="preload" href="fonts/font-65Md.woff2" as="font"*/}
          {/*      type="font/woff2"/>*/}
          {/*<link rel="preload" href="fonts/font-55Rg.woff2" as="font"*/}
          {/*      type="font/woff2"/>*/}
          <meta name={"description"} content={"Hidde Schultze – Creative Developer from the Netherlands. Founder of VisualRadioAssist and hidde.dev"}/>
        </Head>
        <body>
        <Main/>
        <NextScript/>
        </body>
      </Html>
    )
  }
}

export default MyDocument
