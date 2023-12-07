'use client'
import { useState } from 'react'

export default function QandA () {
  const [enabled, setEnabled] = useState(false)
  return (
    enabled === true ? (<div className={'text-left'}><h5 className={"mb-2"}>FAQ and A</h5>
      <p className={'mb-2'}>Q: house warming? die woons toch al lange tied in
        Utereg? da huus is
        toch al lange küüld?
        <br/>A: yes. that's why we're going to warm it up! (fireworks are only
        allowed on the wooden balcony)</p>
      <p className={'mb-2'}>Q: warm enough for a sleepover?
        <br/>A: yes. sleepover details will follow!</p>
      <p className={'mb-2'}>Q: +2, is that 1+1?
        <br/>A: yes, you've managed to kill mathematics! please share
        nye.hidde.me with friends whom you think should & would also enjoy
        fireworks at het kasteel met ophaalbrug!</p>
      <p></p></div>) : <div className="font-bold cursor-pointer" onClick={() => setEnabled(true)}>FAQ and A {">"}</div>

  )
}
