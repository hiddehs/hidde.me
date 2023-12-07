import React from 'react'

export const metadata = {
  metadataBase: "https://hidde.me",
  title: 'hidde.me – hidde schultze – full stack dev',
  description: 'Hidde Schultze – Creative Developer from the Netherlands. Founder of VisualRadioAssist and hidde.dev',
  keywords: 'hidde, schultze, visual radio, visual radio assist, visualradioassist, drimpy, hidde.dev, ehealth, health, corona app, backend minvws, brain bakery website',
  openGraph: {
    type: 'website',
    title: 'hidde schultze – full stack dev',
    url: 'https://hidde.me/',
    description: 'Hidde Schultze is a full stack developer from the Netherlands, founder of VisualRadioAssist and working on several (e)health projects.',
    image: '',
  },
}

import '../css/app.scss'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
    <head>
      <script async
              src="https://www.googletagmanager.com/gtag/js?id=G-59WQ8WPRZK"></script>
      <script dangerouslySetInnerHTML={{
        __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-59WQ8WPRZK');
        `,
      }}
      />
    </head>
    <body>
    {children}
    </body>

    </html>
  )
}
