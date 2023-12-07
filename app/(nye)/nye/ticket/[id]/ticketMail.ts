'use server'
import { Ticket } from '@/app/(nye)/nye/ticket'
import { Resend } from 'resend'

export default async function sendTicketMail (
  ticket: Ticket, imageDataB64: string) {
  const resend = new Resend(process.env.RESEND_API_KEY)

  const mailResponse = await resend.emails.send({
    from: 'HIDDE NYE PARTY TICKETS \<tickets@nye.hidde.me\>',
    to: ticket.email.length > 0 ? ticket.email : 'nye+tickets@hidde.me',
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
      <p>Check the calendar invite attached, so you don't miss the new year (yes it's already in ${31 -
    new Date().getDay()} days!).</p>
      <p>Joining for dinner, and dietary wishes? happy to customise, <a href="https://wa.me/310623051810">let me know</a> </p>
      <p>Check your very personal unique and personal ticket №${ticket.no} via the following link: (I don't know if I still have a functioning frontdoor by 31-12, so the ticket doorpolicy is questionable)</p>
      <a href="https://nye.hidde.me/nye/ticket/${ticket.id}">
      <div style="padding: 10px 15px; display: inline-block; border: 1.5px solid black;text-decoration: none;color:black; margin-bottom: 1em;">
      See your ticket fullscreen
      </div>
      </a>
      <br>
      <h4>FAQ and A</h4>
      <p>Q: house warming? die woons toch al lange tied in Utereg? da huus is toch al lange küüld?
      <br/>A: yes. that's why we're going to warm it up! (fireworks are only allowed on the wooden balcony)</p>
      <p>Q: warm enough for a sleepover?
      <br/>A: yes. sleepover details will follow!</p>
      <p>Q: +2, is that 1+1?
      <br/>A: yes, you've managed to kill mathematics! please share nye.hidde.me with friends whom you think should & would also enjoy fireworks at het kasteel!</p>
      <p></p>
      
      <br/>
      <br/>
      zin om samen het nieuwe jaar in te gaan! / looking forward to celebrate the new year together!<br/>
      <p>groetjes, hidde</p>
</div>`,
  })
  console.debug(mailResponse)
  return true
}
