import React, { useState } from 'react'
import _ from 'lodash'
import moment from 'moment'

export default function PatternBackground () {

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

  let createGitPattern = (colSize) => {
    let colCount = colCalculator(colSize)
    let totalCircleCount = colCount * 16

    let startDate = moment().add('-' + totalCircleCount, 'days')
    let pattern = []
    let currentDayIndex = 0
    let prevStartDate = { year: null, month: null }

    for (let i = 0; i < colCount; i++) {
      let col = []
      for (let j = 0; j < 16; j++) {
        let element
        startDate.add('+24', 'hours')
        if (startDate.year() !==
          prevStartDate.year) {
          element = <>
            <div key={startDate.unix()}
                 className={'month text-xs'}>{startDate.format('YY')}</div>
            <div key={startDate.unix()}
                 className={'month text-xs'}>{startDate.format('MMM')}.
            </div>
          </>
        } else if (startDate.month() !== prevStartDate.month) {
          element = <div key={startDate.unix()}
                         className={'month text-xs'}>{startDate.format(
            'MMM')}</div>
        } else {
          element = <div onMouseEnter={elEnter} onMouseLeave={elLeave}
                         key={startDate.unix()}
                         className={`circle date-${startDate.toString()}`}></div>
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

  let makePattern = () => {
    return {
      left: createPattern(7),
      git: createGitPattern(5),
      right: createPattern(0),
    }
  }
  const [pattern, setPattern] = useState(makePattern)
  if (process.browser) {
    window.addEventListener('resize', _.debounce(() => {
      setPattern(makePattern())
    }, 200))
  }
  return (
    <>
      <div className="pattern-background z-0">
        {pattern.left}
        {pattern.git}
        {pattern.right}
      </div>
      <style jsx>{`
        .circle-col .month{
          font-size: .5em;
        }
      `}</style>
    </>

  )
}
