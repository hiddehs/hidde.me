import React, { useEffect, useState } from 'react'

export default function PatternCreator (height = 17, size = 0) {

  const [colSize, setColSize] = useState(size)
  const [colCount, setColCount] = useState(0)

  const elEnter = (event) => {
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

  const elLeave = (event) => {
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

  useEffect(() => {
    setColCount(Math.floor((((window.innerWidth - 16) / 44) * (colSize / 20))))
  })
  const createPattern = () => {
    if (colSize < 1) return
    let pattern = []
    for (let i = 0; i < colCount; i++) {
      let col = []
      for (let j = 0; j < height; j++) {
        col.push(<div onMouseEnter={elEnter} onMouseLeave={elLeave}
                      key={(1 + i + j)}
                      className="circle"></div>)
      }
      pattern.push(<div className="circle-col"
                        key={colSize + '' + i}>{col}</div>)
    }
    return pattern
  }
  return {
    createPattern,
    events: {
      elEnter,
      elLeave,
    },
  }
}
