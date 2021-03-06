import _ from 'lodash'
import PatternCreator from './patternModule'
import moment from 'moment'
import { useState } from 'react'

export default function gitPatternModule (
  api, events, height = 17) {

  const gitCountThresholdColors = {
    '0': 'primary',
    '2': 'blue',
    '5': 'green',
    '18': 'red',
    '200': 'orange',
  }
  let gitColCount = 0
  // let totalGitCircleCount = 0

  let createGitPattern = (colSize) => {
    gitColCount = PatternCreator().colCalculator(colSize)
    let startDate = events.getGitStartMoment.clone()

    let pattern = []
    let prevStartDate = { year: null, month: null }

    for (let i = 0; i < gitColCount; i++) {
      let col = []
      for (let j = 0; j < (height); j++) {
        let element
        startDate = startDate.add('1', 'day')
        let startDateFreeze = false
        if (startDate.year() !==
          prevStartDate.year && (j !== 0 || i !== 0)) {
          element = <>
            <div key={startDate.unix()}
                 className={'month text-xs'}>{startDate.format('YY')}</div>
            <div key={startDate.unix() + 1}
                 className={'month text-xs'}>{startDate.format('MMM')}
            </div>
          </>
          startDateFreeze = true
          j++
        } else if (startDate.month() !== prevStartDate.month &&
          (j !== 0 || i !== 0)) {
          element = <div key={startDate.unix() + startDate.format('MM')}
                         className={'month text-xs'}>{startDate.format(
            'MMM')}</div>
          startDateFreeze = true
        } else {
          let dateString = startDate.format('Y-MM-DD')
          const contributionsOnDate = api.contributions[dateString]

          let count = (contributionsOnDate) ? contributionsOnDate.length : 0

          let commitCountColor = 'primary'
          for (let threshold in gitCountThresholdColors) {
            if (threshold >= count) {
              commitCountColor = gitCountThresholdColors[threshold]
              break
            }
          }
          element =
            <div onClick={() => {
              events.setContributionDay(dateString)
            }}
                 key={startDate.unix()}
                 className={`circle text-white circle-git color-${commitCountColor} ${startDate.format(
                   'DD')} ${(events.getContributionDay === dateString)
                   ? 'is-active'
                   : ''}`}
            ><span className="tag">{count}</span></div>
        }
        col.push(element)
        prevStartDate = {
          month: startDate.month(),
          year: startDate.year(),
        }
        if (startDateFreeze) startDate.add('-1', 'day')
      }
      pattern.push(<div className="circle-col" key={i}>{col}</div>)
    }
    return pattern
  }
  return {
    createGitPattern,
    gitColCount,
  }
}
