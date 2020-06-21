import React, { useState } from 'react'
import _ from 'lodash'
import moment from 'moment'
import useSWR from 'swr'
import fetch from 'unfetch'
import ContributionViewer from './ContributionViewer'
import PatternCreator from './patterns/patternModule'
import patternModule from './patterns/patternModule'

const fetcher = url => fetch(url).then(r => r.json())

export default function PatternBackground () {
  const { data: api, error } = useSWR('/api/git', fetcher)
  const [getGitDayState, setGitDayState] = useState(null)



  // let gitTreshholds = {
  //   min:
  // }

  const gitCountThresholdColors = {
    '0': 'primary',
    '2': 'blue',
    '5': 'green',
    '18': 'red',
    '200': 'orange',
  }

  let setGitDayStateDebounced = _.debounce(function (contributionsOnDate) {
    setGitDayState(contributionsOnDate)
  }, 20)
  let gitElEnter = (contributionsOnDate, e) => {
    setGitDayStateDebounced(contributionsOnDate)
    // PatternCreator().events.elEnter(e)
  }

  let createGitPattern = (colSize) => {
    let colCount = PatternCreator().colCalculator(colSize) - 1
    let totalCircleCount = ((colCount) * 16) - 1

    let startDate = moment().add('-' + totalCircleCount, 'days')
    let pattern = []
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
                 className={'month text-xs'}>{startDate.format('MMM')}
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
                 onMouseLeave={PatternCreator().events.elLeave}
                 key={startDate.unix()}
                 className={`circle text-white circle-git color-${commitCountColor} ${startDate.format(
                   'MM')}`}
            ><span className="tag">{count}</span></div>
        }
        col.push(element)
        prevStartDate = {
          month: startDate.month(),
          year: startDate.year(),
        }
      }
      if (i + 1 === colCount) {
        col.pop()
        col.push(<div
          className={'month text-xs'}>today.</div>)
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

  return (
    <>
      <div className="pattern-background z-0">
        {PatternCreator().createPattern(7)}
        {(api) && createGitPattern(5)}
        {PatternCreator().createPattern(0)}
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

