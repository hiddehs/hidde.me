export default function PatternBackground () {
  let elEnter = (event) => {
    const el = event.target
    let index = Array.from(el.parentNode.children).indexOf(el)

    let nearHoverCircles = []
    let lessNearHoverCircles = []
    if(el.parentNode.previousElementSibling){
      nearHoverCircles.push(el.parentNode.previousElementSibling.children[index])
      lessNearHoverCircles.push(el.parentNode.previousElementSibling.children[index-1])
      lessNearHoverCircles.push(el.parentNode.previousElementSibling.children[index+1])
    }
    if(el.parentNode.nextElementSibling){
      nearHoverCircles.push(el.parentNode.nextElementSibling.children[index])
      lessNearHoverCircles.push(el.parentNode.nextElementSibling.children[index-1])
      lessNearHoverCircles.push(el.parentNode.nextElementSibling.children[index+1])
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


    if(el.parentNode.previousElementSibling){
      nearHoverCircles.push(el.parentNode.previousElementSibling.children[index])
      nearHoverCircles.push(el.parentNode.previousElementSibling.children[index-1])
      nearHoverCircles.push(el.parentNode.previousElementSibling.children[index+1])
    }
    if(el.parentNode.nextElementSibling){
      nearHoverCircles.push(el.parentNode.nextElementSibling.children[index])
      nearHoverCircles.push(el.parentNode.nextElementSibling.children[index-1])
      nearHoverCircles.push(el.parentNode.nextElementSibling.children[index+1])
    }
    nearHoverCircles.push(el.nextElementSibling)
    nearHoverCircles.push(el.previousElementSibling)

    nearHoverCircles.forEach((el) => {
      if (el) {
        el.classList.remove('near-hover')
        el.classList.remove("less-near-hover")
      }
    })
  }

  let createPattern = () => {
    let pattern = []
    for (let i = 0; i < 100; i++) {
      let col = []
      for (let j = 0; j < 17; j++) {
        let el = <div onMouseEnter={elEnter} onMouseLeave={elLeave}
                      className="circle"></div>
        col.push(el)
      }
      pattern.push(<div className="circle-col">{col}</div>)
    }
    return pattern
  }
  return (
    <>
      <div className="pattern-background z-0">
        {createPattern()}
      </div>
      <style jsx>{`
        
      `}</style>
    </>

  )
}
