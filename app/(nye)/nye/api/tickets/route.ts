import { kv } from '@vercel/kv'
import { Ticket } from '@/app/(nye)/nye/ticket'
import { NextRequest } from 'next/server'

export async function GET (request: NextRequest) {

  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', {
      status: 401,
    });
  }
  const ticket_ids = await kv.smembers('ticket_ids')
  // const data = await res.json()
  const pipe = kv.pipeline()
  for (const ticketId of ticket_ids) {
    pipe.get(`ticket_${ticketId}`)
  }

  const tickets = await pipe.exec<Ticket[]>()
  const dinner_count = (await kv.get<number>('dinner_ticket_no'))
  return Response.json({ tickets, dinner_count })
}
