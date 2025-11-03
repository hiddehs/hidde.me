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
    <Header key={1}/>,
    children,
    <Analytics key={2}/>,
    <Footer key={3}/>
  ]
}
