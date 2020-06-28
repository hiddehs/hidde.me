import _ from 'lodash'
import PatternCreator from './patternModule'
import moment from 'moment'
import { useState } from 'react'

export default function gitPatternModule (api, events, height = 17) {

  const gitCountThresholdColors = {
    '0': 'primary',
    '2': 'blue',
    '5': 'green',
    '18': 'red',
    '200': 'orange',
  }
  let gitColCount = 0
  let totalGitCircleCount = 0

  let createGitPattern = (colSize) => {
    gitColCount = PatternCreator().colCalculator(colSize)
    totalGitCircleCount = ((gitColCount) * height) - 1

    let startDate = moment().add('-' + totalGitCircleCount, 'days')
    let pattern = []
    let prevStartDate = { year: null, month: null }

    for (let i = 0; i < gitColCount; i++) {
      let col = []
      for (let j = 0; j < (height); j++) {
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
          j++
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
          // onTouchStart={(e) => {console.log(e);events.enter(contributionsOnDate, e)}}
          element =
            <div onMouseEnter={(e) => {events.enter(contributionsOnDate, e)}}
                 onMouseLeave={events.leave}
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
      if (i + 1 === gitColCount) {
        col.pop()
        col.push(<div
          className={'month text-xs'} key={i+1}>today.</div>)
      }
      pattern.push(<div className="circle-col" key={i}>{col}</div>)
    }
    return pattern
  }
  return {
    createGitPattern,
    gitColCount,
    totalGitCircleCount,
  }
}
