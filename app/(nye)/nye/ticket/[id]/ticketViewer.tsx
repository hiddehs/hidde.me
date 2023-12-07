'use client'
import html2canvas from 'html2canvas'
import { useEffect, useState } from 'react'
import sendTicketMail from '@/app/(nye)/nye/ticket/[id]/ticketMail'

export function TicketViewer ({ ticket }) {
  const [canvassing, setCanvassing] = useState(false)
  let canvas
  const getImageDataUrl = async () => {
    // if (!canvas)
    canvas = await html2canvas(document.getElementById('ticket'))
    return canvas.toDataURL('image/png')
  }

  const sendMail = async () => {
    setCanvassing(true)
    const imageData = await getImageDataUrl()
    // .split("data:image/png;base64,")[1]
    await sendTicketMail(ticket, imageData)
    setCanvassing(false)
  }
  let running = false

  useEffect(() => {
    if (running) return
    running = true
    console.log(((new Date()).valueOf() - ticket.created_at))
    if (ticket.created_at && ((new Date()).valueOf() - ticket.created_at) <
      5000) {
      setCanvassing(true)
      setTimeout(() => {
        sendMail()
      }, 200)
    }
    setCanvassing(false)
  }, [])
  const download = async () => {
    'use client'
    setCanvassing(true)
    setTimeout(async () => {
      // Create a link element
      const downloadLink = document.createElement('a')
      downloadLink.href = await getImageDataUrl()
      downloadLink.download = `hidde_nye_ticket_${ticket.no}.png`

      // Append the link to the body
      document.body.appendChild(downloadLink)

      // Simulate click to trigger download
      downloadLink.click()
      setCanvassing(false)

      // Clean up
      document.body.removeChild(downloadLink)
    }, 100)
  }
  return [
    <div
      key={1}
      id={'ticket'}
      className="relative bg-primary md:w-auto w-full text-xs mt-auto font-medium mb-12">
      <div
        className="ticket-left text-left w-full h-full justify-center pl-7 pr-44 md:pl-12 py-6 md:py-8 flex gap-2 md:gap-4 flex-col">
                <span>31.12.2023 HIDDE'S NYE COLDHOUSE<br/>
                  WARMINGBIRTHDAYPARTY</span>
        <h2
          className={'text-2xl md:text-5xl max-w-[20rem] break-all ' +
            (canvassing ? 'max-h-24' : 'line-clamp-2')}>{ticket.name.substring(
          0, 40)}</h2>

        <div className="flex items-center gap-4">
          <div
            className="bg-red mt-2 flex items-center rounded-2xl relative w-[3.25rem] h-12 md:rounded-3xl">
            <h3
              className="text-white absolute left-1/2 transform top-1/2 -translate-y-1/2 -translate-x-1/2 font-medium text-lg md:text-2xl leading-[100%]">{ticket.dinner
              ? '🍝'
              : '💃'}</h3>
          </div>
          <h6 className={'text-sm leading-none md:text-base'}>
            {ticket.email.length > 0 ? ticket.email.substring(0, 20) : null}
            {ticket.email.length > 0 ? <br/> : null}

            see you at {ticket.dinner ? '18:00' : '20:00'}!
          </h6>
        </div>
      </div>
      <div className="absolute h-full left-0 top-0">
        <svg xmlns="http://www.w3.org/2000/svg"
             className="h-full left-0 top-0"
             viewBox="0 0 316 170" fill="#FE4100">
          <path fillRule="evenodd" clipRule="evenodd"
                d="M15.0875 4.08651L224.834 4.08651C226.851 11.2717 234.041 16.1846 242 16.5666V16.8856H243.775V16.5762C251.823 16.2769 259.13 11.3394 261.166 4.08651L300.305 4.08651C306.58 4.08651 311.667 9.17317 311.667 15.4479L311.666 66.7106C303.599 68.5195 297.777 76.0842 297.777 84.7866C297.777 93.489 303.599 101.054 311.666 102.863L311.667 154.912C311.667 161.187 306.58 166.273 300.305 166.273L260.265 166.273C258.455 159.134 251.549 154.15 243.775 153.484V152.196H242V153.409C233.524 153.409 225.681 158.595 223.735 166.273L15.0875 166.273C8.81281 166.273 3.72615 161.187 3.72615 154.912L3.72615 102.863C11.7941 101.054 17.6161 93.489 17.6161 84.7866C17.6161 76.0842 11.7941 68.5194 3.72615 66.7106L3.72615 15.4479C3.72615 9.17318 8.81282 4.08651 15.0875 4.08651ZM15.0875 0.360352L228.006 0.360352C228.229 7.29861 234.856 12.8645 243 12.8645C251.144 12.8645 257.771 7.29861 257.994 0.360352L300.305 0.360352C308.638 0.360352 315.393 7.11527 315.393 15.4479L315.393 66.3006V70.0268C307.721 70.0268 301.503 76.635 301.503 84.7866C301.503 92.9382 307.721 99.5464 315.393 99.5464V103.273L315.393 154.912C315.393 163.245 308.638 170 300.305 170L260.726 170H257C257 162.895 250.284 157.135 242 157.135C233.716 157.135 227 162.895 227 170H223.274L15.0875 170C6.75491 170 0 163.245 0 154.912L0 103.273L0 99.5464H7.43866e-05C7.67124 99.5464 13.8899 92.9382 13.8899 84.7866C13.8899 76.635 7.67124 70.0268 7.43866e-05 70.0268H0L0 66.3006L0 15.4479C0 7.11528 6.75492 0.360352 15.0875 0.360352ZM242 21.2504V25.6153H243.775V21.2504H242ZM242 29.9802V34.345L243.775 34.345V29.9802H242ZM242 38.7099V43.0747L243.775 43.0747V38.7099L242 38.7099ZM242 47.4396V51.8045L243.775 51.8045V47.4396L242 47.4396ZM242 56.1693V60.5342L243.775 60.5342V56.1693L242 56.1693ZM242 64.8991V69.2639H243.775L243.775 64.8991H242ZM242 73.6288V77.9937H243.775V73.6288H242ZM242 82.3585V86.7234H243.775V82.3585H242ZM242 91.0883V95.4531H243.775V91.0883H242ZM242 99.818V104.183H243.775V99.818H242ZM242 108.548V112.913H243.775V108.548H242ZM242 117.277V121.642H243.775V117.277H242ZM242 126.007V130.372L243.775 130.372V126.007H242ZM242 134.737V139.102L243.775 139.102V134.737L242 134.737ZM242 143.467L242 147.832H243.775L243.775 143.467H242Z"
                fill="#FE4100"/>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg"
             className="absolute h-full right-0 top-0"
             viewBox="0 0 73 170" fill="none">
          <path fillRule="evenodd" clipRule="evenodd"
                d="M0 15.0875C0 14.2008 0.0764979 13.3319 0.223254 12.4872C0.480512 12.4984 0.739481 12.5041 1 12.5041C9.14361 12.5041 15.7715 6.93826 15.9942 0L57.9125 0C66.2451 0 73 6.75492 73 15.0875L73 69.6722C65.5104 69.8931 59.5028 76.4142 59.5028 84.4262C59.5028 92.4383 65.5104 98.9593 73 99.1803L73 154.912C73 163.245 66.2451 170 57.9125 170H15.0875C15.0564 170 15.0253 170 14.9942 170C14.9981 169.88 15 169.76 15 169.639C15 162.567 8.34569 156.827 0.113799 156.775C0.0386807 156.165 0 155.543 0 154.912L0 15.0875Z"
                fill="#FE4100" fillOpacity="0.2"/>
        </svg>
        <span
          className="text-3xl absolute -right-4 top-1/2 transform -translate-y-1/2 rotate-90">№{ticket.no}</span>

      </div>

    </div>,

    <div key={3} className={'text-xl'}>superleuk dat je erbij bent! <span
      className="text-purple-500">
          ☺
        </span>︎ groetjes hidde
    </div>
    ,
    ticket.dinner ? <div key={5} className={'text-base'}>
      dieet wensen? <a href="https://wa.me/310623051810">let me know</a>
    </div> : null,
    <div className={'flex gap-4'} key={2}>
      <button
        onClick={() => navigator.share ? navigator.share({
          title: document.title,
          url: window.location.href,
        }) : null}
        className={`btn text-center`}><span
        className="hs-icon link-arrow-right mr-1"></span> Share this NYE party with
        friends
      </button>
      <button
        onClick={download}
        className={`btn text-center`}><span
        className="hs-icon link-arrow-right mr-1"></span> Download Ticket
      </button>


    </div>
    ,
  ]
}
