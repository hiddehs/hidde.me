import React, { useState } from 'react'
import _ from 'lodash'
import moment from 'moment'
import useSWR from 'swr'
import fetch from 'unfetch'
import ContributionViewer from './ContributionViewer'
import PatternCreator from './patterns/patternModule'
import patternModule from './patterns/patternModule'
import gitPatternModule from './patterns/gitPatternModule'

const fetcher = url => fetch(url).then(r => r.json())

export default function PatternBackground () {
  const { data: api, error } = useSWR('/api/git', fetcher)
  const [getGitDayState, setGitDayState] = useState(null)

  let setGitDayStateDebounced = _.debounce(function (contributionsOnDate) {
    setGitDayState(contributionsOnDate)
  }, 200)

  const [getCommitViewerLocation, setCommitViewerLocation] = useState('top')
  let gitElEnter = (contributionsOnDate, e) => {
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

    setGitDayStateDebounced(contributionsOnDate)
    // PatternCreator().events.elEnter(e)
  }

  // if (process.browser) {
  //   window.addEventListener('resize', _.debounce(() => {
  //     // setPattern(makePattern())
  //   }, 200))
  // }
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

  let gp = gitPatternModule(api, {
      enter: gitElEnter,
      leave: PatternCreator().events.elLeave,
    },
    gitHeight,
  )
  let pc = PatternCreator(height)
  return (
    <>
      <div className="pattern-background z-0">
        {pc.createPattern(basePatternSize)}
        {(api) &&
        <div className="git pattern-background p-0" onMouseLeave={() => {
          setGitDayState(null)
        }} style={{
          padding: 0,
          overflow: 'visible',
          position: 'relative',
          width: 'auto',
        }}>
          {gp.createGitPattern(gitPatternSize)}
          {getGitDayState !== null && getGitDayState !== undefined &&
          <ContributionViewer location={getCommitViewerLocation}
                              contributions={getGitDayState}/>
          }
        </div>
        }
        {pc.createPattern(restPatternSize)}
      </div>
      <style jsx>{`
        .circle-col .month{
          font-size: .5em;
        }
      `}</style>
    </>

  )
}

