'use server'
import { Ticket } from '@/app/(nye)/nye/ticket'
import { Resend } from 'resend'

export default async function sendTicketMail (
  ticket: Ticket, imageDataB64: string) {
  const resend = new Resend(process.env.RESEND_API_KEY)

  const mailResponse = await resend.emails.send({
    from: 'HIDDE NYE PARTY TICKETS \<tickets@nye.hidde.me\>',
    to: ticket.email.length > 0 ? ticket.email : 'tickets@nye.hidde.me',
    reply_to: "nye+tickets@hidde.me",
    bcc: 'hidde+nyetickets@hidde.me',
    attachments: [
      {
        filename: 'NYE Party Hidde Utrecht.ics',
        path: 'https://nye.dev.hidde.dev/NYE Party Hidde at Utrecht.ics',
      },
      {
        filename: `hidde_nye_party_superpersonalunique_ticket_${ticket.no}.png`,
        content: Buffer.from(imageDataB64.split('data:image/png;base64,')[1],
          'base64'),
      },
    ],
    subject: `🎆💃Hidde's NYE Party: Here's your ticket ${ticket.name}!`,
    html: `<div style="font-family: Helvetica, Arial;">
    <h1>Hi ${ticket.name}, here's your NYE ticket №${ticket.no}!</h1>
      <p>Check the calendar invite attached, so you don't miss the new year.</p>
      <p>Check your very unique and personal ticket №${ticket.no} via the following link: </p>
      <a href="https://nye.hidde.me/nye/ticket/${ticket.id}">
      <div style="padding: 10px 15px; display: inline-block; border: 1.5px solid black;text-decoration: none;color:black; margin-bottom: 1em;">
      See your ticket fullscreen
      </div>
      </a>
      <br>
</div>`,
  })
  console.debug(mailResponse)
  return true
}
