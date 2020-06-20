import React, { useState } from 'react'
import _ from 'lodash'
import moment from 'moment'
import useSWR from 'swr'
import fetch from 'unfetch'
import ContributionViewer from './ContributionViewer'

const fetcher = url => fetch(url).then(r => r.json())

export default function PatternBackground () {
  const { data: api, error } = useSWR('/api/git', fetcher)
  const [getGitDayState, setGitDayState] = useState(null)

  let elEnter = (event) => {
    const el = event.target
    let index = Array.from(el.parentNode.children).indexOf(el)

    let nearHoverCircles = []
    let lessNearHoverCircles = []
    if (el.parentNode.previousElementSibling) {
      nearHoverCircles.push(
        el.parentNode.previousElementSibling.children[index])
      lessNearHoverCircles.push(
        el.parentNode.previousElementSibling.children[index - 1])
      lessNearHoverCircles.push(
        el.parentNode.previousElementSibling.children[index + 1])
    }
    if (el.parentNode.nextElementSibling) {
      nearHoverCircles.push(el.parentNode.nextElementSibling.children[index])
      lessNearHoverCircles.push(
        el.parentNode.nextElementSibling.children[index - 1])
      lessNearHoverCircles.push(
        el.parentNode.nextElementSibling.children[index + 1])
    }
    nearHoverCircles.push(el.nextElementSibling)
    nearHoverCircles.push(el.previousElementSibling)

    nearHoverCircles.forEach((el) => {
      if (el) el.classList.add('near-hover')
    })
    lessNearHoverCircles.forEach((el) => {
      if (el) el.classList.add('less-near-hover')
    })
  }

  let elLeave = (event) => {
    const el = event.target
    let index = Array.from(el.parentNode.children).indexOf(el)
    let nearHoverCircles = []

    if (el.parentNode.previousElementSibling) {
      nearHoverCircles.push(
        el.parentNode.previousElementSibling.children[index])
      nearHoverCircles.push(
        el.parentNode.previousElementSibling.children[index - 1])
      nearHoverCircles.push(
        el.parentNode.previousElementSibling.children[index + 1])
    }
    if (el.parentNode.nextElementSibling) {
      nearHoverCircles.push(el.parentNode.nextElementSibling.children[index])
      nearHoverCircles.push(
        el.parentNode.nextElementSibling.children[index - 1])
      nearHoverCircles.push(
        el.parentNode.nextElementSibling.children[index + 1])
    }
    nearHoverCircles.push(el.nextElementSibling)
    nearHoverCircles.push(el.previousElementSibling)

    nearHoverCircles.forEach((el) => {
      if (el) {
        el.classList.remove('near-hover')
        el.classList.remove('less-near-hover')
      }
    })
  }

  let colCalculator = (colSize = 1) => {
    if (process.browser) {
      return Math.round((window.innerWidth / 36) * (colSize / 12))
    }
    return 0
  }

  let createPattern = (colSize) => {
    let colCount = colCalculator(colSize)
    let pattern = []
    for (let i = 0; i < colCount; i++) {
      let col = []
      for (let j = 0; j < 17; j++) {
        let el = <div onMouseEnter={elEnter} onMouseLeave={elLeave}
                      key={1 + i + j}
                      className="circle"></div>
        col.push(el)
      }
      pattern.push(<div className="circle-col" key={i}>{col}</div>)
    }
    return pattern
  }

  // let gitTreshholds = {
  //   min:
  // }

  const gitCountThresholdColors = {
    '0': 'primary',
    '2': 'blue',
    '5': 'green',
    '200': 'red',
  }

  let gitElEnter = (contributionsOnDate, e) => {
    console.log("elEnter()")
    _.debounce(function(){
      console.log("bounce")
      setGitDayState(contributionsOnDate)
    }, 400)()
    elEnter(e)
  }
  let gitElLeave = (e) => {
    elLeave(e)
  }

  let createGitPattern = (colSize) => {
    // if(api) console.log(api.contributions.length)
    let colCount = colCalculator(colSize)
    let totalCircleCount = (colCount) * 16
    totalCircleCount = totalCircleCount - 16

    let startDate = moment().add('-' + totalCircleCount, 'days')
    let pattern = []
    let currentDayIndex = 0
    let prevStartDate = { year: null, month: null }

    for (let i = 0; i < colCount; i++) {
      let col = []
      for (let j = 0; j < 16; j++) {
        let element
        startDate = startDate.add('1', 'day')
        if (startDate.year() !==
          prevStartDate.year) {
          element = <>
            <div key={startDate.unix()}
                 className={'month text-xs'}>{startDate.format('YY')}</div>
            <div key={startDate.unix() + 1}
                 className={'month text-xs'}>{startDate.format('MMM')}.
            </div>
          </>
        } else if (startDate.month() !== prevStartDate.month) {
          element = <div key={startDate.unix()}
                         className={'month text-xs'}>{startDate.format(
            'MMM')}</div>
        } else {
          const contributionsOnDate = api.api.contributions[startDate.format(
            'Y-MM-DD')]

          let count = (contributionsOnDate) ? contributionsOnDate.length : 0

          let commitCountColor = 'primary'
          for (let threshold in gitCountThresholdColors) {
            if (threshold >= count) {
              commitCountColor = gitCountThresholdColors[threshold]
              break
            }
          }

          element =
            <div onMouseEnter={(e) => {gitElEnter(contributionsOnDate, e)}}
                 onMouseLeave={elLeave}
                 key={startDate.unix()}
                 className={`circle text-white circle-git color-${commitCountColor}`}
            ><span className="tag">{count}</span></div>
        }
        col.push(element)
        prevStartDate = {
          month: startDate.month(),
          year: startDate.year(),
        }
        currentDayIndex++
      }
      pattern.push(<div className="circle-col" key={i}>{col}</div>)
    }
    return pattern
  }

  // if (process.browser) {
  //   window.addEventListener('resize', _.debounce(() => {
  //     setPattern(makePattern())
  //   }, 200))
  // }
  if (!api) return <p>⏳</p>
  return (
    <>
      <div className="pattern-background z-0">
        {createPattern(7)}
        {createGitPattern(5)}
        {createPattern(0)}
      </div>
      {getGitDayState !== null && getGitDayState !== undefined &&
      <ContributionViewer contributions={getGitDayState}/>
      }
      <style jsx>{`
        .circle-col .month{
          font-size: .5em;
        }
      `}</style>
    </>

  )
}

