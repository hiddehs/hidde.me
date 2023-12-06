import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import PatternCreator from './patterns/patternModule'
import moment from 'moment'
import gitPatternModule from './patterns/gitPatternModule'

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
  const patterns = {
    prepend: PatternCreator(height, basePatternSize),
    g: PatternCreator(height, gitPatternSize),
    append: PatternCreator(height, restPatternSize),
  }

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
      leave: patterns.g.events.elLeave,
      setContributionDay: setContributionDay,
      getContributionDay: getContributionDay,
      getGitStartMoment: getGitStartMoment,
    },
    patterns.g,
  )
  let setGitDayStateDebounced = _.debounce(function (contributionsOnDate) {
    // setGitDayState(contributionsOnDate)
  }, 200)

  const [getCommitViewerLocation, setCommitViewerLocation] = useState('top')

  useEffect(() => {

    if (window.innerWidth < 768) {
      // mobile enz
      basePatternSize = gitPatternSize = 20
      height = 10
      gitHeight = 5
    } else if (window.innerWidth > 1200) {
      basePatternSize = 12
      gitPatternSize = 5
      restPatternSize = 4
    }

    patterns.prepend.setColSize(basePatternSize)
    patterns.append.setColSize(restPatternSize)
    patterns.g.setColSize(gitPatternSize)

    if (!getGitStartMoment) {
      // console.log(gitHeight)
      // console.log("calc cols", patterns.g.calcCols(gitPatternSize)
      // )
      let totalGitCircleCount = Math.min(((patterns.g.calcCols(gitPatternSize)) * gitHeight),
        240)
      // console.log(totalGitCircleCount)
      let initialMoment = moment().
        add('-' + totalGitCircleCount, 'days').
        set('hours', 0).
        set('minutes', 0).
        set('seconds', 0)
      initialMoment.add('+' + (moment().diff(initialMoment, 'months')), 'day')
      initialMoment.add('+' + (moment().year() - initialMoment.year()), 'day')
      // console.log({initialMoment: initialMoment.toISOString()})
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
        {patterns.prepend.createPattern(basePatternSize)}
        {data && getGitStartMoment &&
          <div className="git pattern-background p-0" style={{
            padding: 0,
            overflow: 'visible',
            position: 'relative',
            width: 'auto',
          }}>
            {gp.createGitPattern()}
          </div>
        }
        {patterns.append.createPattern(basePatternSize)}
      </div>
      <style jsx>{`
        .circle-col .month {
          font-size: .5em;
        }
      `}</style>
    </>

  )
}

