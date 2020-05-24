import Head from 'next/head'
import Layout from '../components/Layout'
import Hero from '../components/index/hero'
import Work from '../components/index/work'
import Expierence from '../components/index/experience'
import About from '../components/index/about'

export default function Home() {
  return (
    <Layout>
      <Hero></Hero>
      <Work></Work>
      <Expierence></Expierence>
      <About></About>
    </Layout>
  )
}
