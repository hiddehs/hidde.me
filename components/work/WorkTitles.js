import { useEffect, useState } from 'react'

export default function WorkTitles () {

  const workTitles = [
    '@ux/ui',
    '@web',
    '@front-end',
    '@ne/uxt.js',
    '@vue.js',
    '@react',
    '@back-end',
    '@laravel',
    '@node.js',
    '@k8s ☸️',
    '@hl7 🏥',
    '@fhir 🔥',
    '@ehealth',
    '@full stack',
  ]
  const [getWorkTitleIndex, setWorkTitleIndex] = useState(0)
  useEffect(() => {
    if (getWorkTitleIndex < workTitles.length - 1) {
      const interval = setInterval(() => {
        setWorkTitleIndex((getWorkTitleIndex) + 1)
      }, (1400 / workTitles.length))
      return () => clearInterval(interval)
    }
  })

  return workTitles[getWorkTitleIndex]
}
