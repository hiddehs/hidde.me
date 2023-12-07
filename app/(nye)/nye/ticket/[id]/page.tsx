import { Ticket } from '@/app/(nye)/nye/ticket'
import { kv } from '@vercel/kv'
import Custom404 from '@/app/not-found'
import { TicketViewer } from '@/app/(nye)/nye/ticket/[id]/ticketViewer'

export default async function Page ({ params }: { params: { id: string } }) {

  const idOrNO = params.id
  let ticket = await kv.get<Ticket>(`ticket_${idOrNO}`)
  console.log(ticket)

  if (!ticket) {
    let ticketId = await kv.get(`ticket_no_${idOrNO}`)
    ticket = await kv.get<Ticket>(`ticket_${ticketId}`)
    if (!ticket) {
      return Custom404()
    }
  }

  return (
    <div className="w-full overflow-hidden p-4 md:p-12 h-full min-h-[100vh]">

      <div
        className="flex items-center flex-col justify-center w-full bg-primary min-h-full p-6 md:p-12 md:py-[20vh] gap-8">
        <svg xmlns="http://www.w3.org/2000/svg" className={'max-h-[20vh] mb-8'}
             viewBox="0 0 432 427"
             fill="none">
          <path d="M172.068 82.96V41.48V0H257.492V82.96H172.068Z"
                fill="#FE4100"/>
          <path
            d="M92.7458 79.3V53.07C92.7458 38.674 92.9898 26.84 93.3559 26.84C93.722 26.84 111.539 42.456 172.068 96.38H257.492L296.786 61.61C318.508 42.456 336.57 26.718 337.058 26.84C337.668 26.84 338.034 38.186 338.156 77.47L273.356 141.52H155.593L92.7458 79.3Z"
            fill="#FE4100"/>
          <path
            d="M62.9695 133.346C43.2 111.996 27.3356 94.184 27.5797 93.696C27.9458 93.086 39.661 92.72 79.322 92.72L144 155.55V270.84L81.1525 332.938L54.9153 333.06C40.5153 333.06 28.3119 332.816 27.7017 332.45C27.2136 332.084 43.078 314.394 98.8475 254.37V172.02L62.9695 133.346Z"
            fill="#FE4100"/>
          <path
            d="M288 157.38L319.485 126.88L350.847 96.38H405.153L400.515 101.504C397.953 104.432 381.722 122 333.153 174.46V256.81L369.153 295.484C388.922 316.834 405.153 334.524 405.153 334.89C405.153 335.256 393.193 335.5 352.068 335.5L288 273.28V157.38Z"
            fill="#FE4100"/>
          <path
            d="M0.122034 254.98L0 213.5L0.122034 172.02H85.5458V254.98H0.122034Z"
            fill="#FE4100"/>
          <path
            d="M346.332 216.184C346.21 193.492 346.576 174.582 347.186 174.094C347.675 173.606 366.956 173.24 432 173.24V257.42H346.576L346.332 216.184Z"
            fill="#FE4100"/>
          <path
            d="M91.4034 348.31L123.498 316.956L155.593 285.602H272.746L335.715 347.09L334.983 399.916L256.881 330.62H171.458L92.1356 401.136L91.4034 348.31Z"
            fill="#FE4100"/>
          <path d="M171.946 427V385.52V344.04H257.614L257.37 427H171.946Z"
                fill="#FE4100"/>
        </svg>
        <TicketViewer ticket={ticket}></TicketViewer>
      </div>
    </div>

  )
}
