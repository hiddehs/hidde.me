import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import useSWR from 'swr'
import fetch from 'unfetch'
import PatternCreator from './patterns/patternModule'
import gitPatternModule from './patterns/gitPatternModule'
import moment from 'moment'

export default function PatternBackground ({
  data,
  getContributionDay,
  setContributionDay,
  setGitStartMoment,
  getGitStartMoment,
}) {

  let height, gitHeight
  height = gitHeight = 13
  let basePatternSize = 14
  let gitPatternSize = 6
  let restPatternSize = 0
  if (process.browser) {
    if (window.innerWidth < 768) {
      // mobile enz
      basePatternSize = gitPatternSize = 20
      height = 10
      gitHeight = 5
    } else if (window.innerWidth > 1200) {
      basePatternSize = 12
      gitPatternSize = 6
      restPatternSize = 4
    }
  }

  let pc = PatternCreator(height)
  const gitElEnter = (contributionsOnDate, e) => {
    let el = e.target
    if (el.parentNode) {

      let y = Array.from(el.parentNode.children).indexOf(el)
      let x = Array.from(el.parentNode.parentNode.children).
        indexOf(el.parentNode)

      if (x > (gp.gitColCount / 3) * 2) {
        //left
        setCommitViewerLocation('left')
      } else if (x < (gp.gitColCount / 3)) {
        // right
        setCommitViewerLocation('right')
      } else {
        //middle
        if (y > 8) {
          setCommitViewerLocation('top')
        } else {
          setCommitViewerLocation('bottom')
        }
      }
    }

    // setGitDayStateDebounced(contributionsOnDate)
    // PatternCreator().events.elEnter(e)
  }
  const gp = gitPatternModule(data, {
      enter: gitElEnter,
      leave: pc.events.elLeave,
      setContributionDay: setContributionDay,
      getContributionDay: getContributionDay,
      getGitStartMoment: getGitStartMoment,
    },
    gitHeight,
  )
  let setGitDayStateDebounced = _.debounce(function (contributionsOnDate) {
    // setGitDayState(contributionsOnDate)
  }, 200)

  const [getCommitViewerLocation, setCommitViewerLocation] = useState('top')

  // if (process.browser) {
  //   window.addEventListener('resize', _.debounce(() => {
  //     // setPattern(makePattern())
  //   }, 200))
  // }

  useEffect(() => {
    if (!getGitStartMoment) {
      let totalGitCircleCount = ((pc.colCalculator(gitPatternSize)) * gitHeight)
      let initialMoment = moment().
        add('-' + totalGitCircleCount, 'days').
        set('hours', 0).
        set('minutes', 0).
        set('seconds', 0)
      initialMoment.add('+' + (moment().diff(initialMoment, 'months')), 'day')
      initialMoment.add('+' + (moment().year() - initialMoment.year()), 'day')
      setGitStartMoment(initialMoment)
    }

    if (data && getContributionDay == null) {
      setContributionDay(
        Object.keys(data.contributions)[Object.keys(data.contributions).length -
        1])
    }
  })



  return (
    <>
      <div className="pattern-background z-0">
        {pc.createPattern(basePatternSize)}
        {data &&
        <div className="git pattern-background p-0" style={{
          padding: 0,
          overflow: 'visible',
          position: 'relative',
          width: 'auto',
        }}>
          {gp.createGitPattern(gitPatternSize)}
        </div>
        }
        {pc.createPattern(restPatternSize)}
      </div>
      <style jsx>{`
        .circle-col .month {
          font-size: .5em;
        }
      `}</style>
    </>

  )
}

