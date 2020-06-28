import React from 'react'

export default function PatternCreator (height = 17) {
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

  let colCalculator = (colSize = 1) => {
    if (process.browser) {
      const calc = Math.floor((((window.innerWidth - 16) / 44) * (colSize / 20)));
      return calc;
    }
    return 0
  }

  const createPattern = (colSize) => {
    if (colSize < 1) return
    let colCount = colCalculator(colSize)
    let pattern = []
    for (let i = 0; i < colCount; i++)
    {let col = []
      for (let j = 0; j < height; j++) {
        let el = <div onMouseEnter={elEnter} onMouseLeave={elLeave}
                      key={1 + i + j}
                      className="circle"></div>
        col.push(el)
      }
      // console.log(colCount);
      pattern.push(<div className="circle-col" key={i}>{col}</div>)
    }
    return pattern
  }
  return {
    createPattern,
    colCalculator,
    events: {
      elEnter,
      elLeave,
    },
  }
}
