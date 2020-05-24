import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps (ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render () {
    return (
      <Html>
        <Head>

          <link rel="icon" href="/favicon.ico"/>
          <link rel="preload" href="fonts/font-75Bd.woff2" as="font"
                type="font/woff2"/>
          <link rel="preload" href="fonts/font-65Md.woff2" as="font"
                type="font/woff2"/>
          <link rel="preload" href="fonts/font-55Rg.woff2" as="font"
                type="font/woff2"/>
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
