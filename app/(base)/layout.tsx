import Header from '@/components/Header'
import Footer from '@/components/Footer'
import React from 'react'
import { Analytics } from '@vercel/analytics/react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return [
    <Header/>,
    children,
    <Analytics/>,
    <Footer/>
  ]
}
