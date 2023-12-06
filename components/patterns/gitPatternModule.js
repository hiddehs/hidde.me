import _ from 'lodash'
import PatternCreator from './patternModule'
import moment from 'moment'
import { useState } from 'react'

export default function gitPatternModule (
  apiData, events, pc, height = 17) {
  const gitCountThresholdColors = {
    '0': 'primary',
    '2': 'blue',
    '5': 'green',
    '18': 'red',
    '200': 'orange',
  }
  let gitColCount = 0
  // let totalGitCircleCount = 0

  let createGitPattern = () => {
    gitColCount = pc.colCount
    height = pc.height
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
          element = <div key={'year-'+i+''+j}>
            <div                  className={'month text-xs'}>{startDate.format('YY')}</div>
            <div
                 className={'month text-xs'}>{startDate.format('MMM')}
            </div>
          </div>
          startDateFreeze = true
          j++
        } else if (startDate.month() !== prevStartDate.month &&
          (j !== 0 || i !== 0)) {
          element = <div key={'mm-'+i+''+j}
                         className={'month text-xs'}>{startDate.format(
            'MMM')}</div>
          startDateFreeze = true
        } else if(apiData.contributions) {
          let dateString = startDate.format('Y-MM-DD')
          const contributionsOnDate = apiData.contributions[dateString]
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
                 key={i+j}
                 className={`circle relative text-white circle-git color-${commitCountColor} ${startDate.format(
                   'DD')} ${(events.getContributionDay === dateString)
                   ? 'is-active'
                   : ''}`}
            >{i===gitColCount -1 && j===height - 1 ? <span style={{top: "calc(50% - 3.4px)", left: "calc(50% - 3.4px)"}} className="absolute animate-ping inline-flex h-1.5 w-1.5 rounded-full bg-red-300 opacity-80"></span>:''} <span className="tag relative">{count}</span></div>
        }
        if(element) col.push(element)
        prevStartDate = {
          month: startDate.month(),
          year: startDate.year(),
        }
        if (startDateFreeze) startDate.add('-1', 'day')
      }
      pattern.push(<div className="circle-col" key={'col-'+i}>{col}</div>)
    }
    return pattern
  }
  return {
    createGitPattern,
    gitColCount,
  }
}
