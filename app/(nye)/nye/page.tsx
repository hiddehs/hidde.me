import { Metadata } from 'next'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { SubmitButton } from '@/app/(nye)/nye/submitButton'
import { redirect } from 'next/navigation'
import { randomUUID } from 'crypto'
import { Ticket } from '@/app/(nye)/nye/ticket'
import { kv } from '@vercel/kv'
import Custom404 from '@/app/not-found'
import React from 'react'
import QandA from '@/app/(nye)/nye/QandA'

export const metadata: Metadata = {
  icons: ['nye_icon.jpg'],
  title: 'hidde NYE party',
  description: 'get your special unique personalised party fissa ticket',
  openGraph: {
    title: 'hidde NYE party',
    description: 'get your special unique personalised party fissa ticket',
    type: 'website',
    url: 'https://nye.hidde.me/',
  },
}

export default async function Page () {
  const dinnerEnabled = (await kv.get<number>('dinner_ticket_no')) < 14

  async function getTicket (formData: FormData) {
    'use server'

    const ticket: Ticket = {
      id: randomUUID(),
      no: Math.floor(Math.random() * (999999 - 100000) + 10000),
      name: formData.get('name').toString(),
      email: formData.get('email')?.toString() ?? '',
      dinner: formData.get('dinner') ? true : false,
      created_at: (new Date()).valueOf(),
    }
    if (!ticket) return Custom404()

    const pipe = kv.pipeline()
    pipe.set('ticket_' + ticket.id, ticket)
    pipe.set('ticket_no_' + ticket.no.toString(), ticket.id)
    pipe.sadd('ticket_ids', ticket.id)
    if (ticket.dinner) pipe.incr('dinner_ticket_no')
    await pipe.exec()

    return redirect(`/nye/ticket/${ticket.id}`)
  }

  return (
    <div className="w-full overflow-hidden p-4 md:p-12 h-full min-h-[100vh]">
      <div
        className="grid w-full xl:grid-cols-2 grid-cols-1 bg-primary min-h-full p-6 md:p-12 gap-8">
        <div className="col-span-1">
          <div className={'md:pb-24 pb-12 pt-4'}>
            <svg xmlns="http://www.w3.org/2000/svg" className={'max-h-[50vh]'}
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
          </div>

          <div className="border-t-4 inline-block border-black pt-4">
            <h1 className={'md:text-5xl text-4xl'}>let's party New Year's!</h1>
          </div>
        </div>
        <div
          className="col-span-1 md:text-right flex flex-col h-full jus items-end">
          <div
            className="relative md:w-auto w-full md:right-[12rem] text-xs mt-auto font-medium mb-12">
            <div
              className="ticket-left text-left w-full h-full justify-center pl-7 md:pl-12 py-6 md:py-8 flex gap-2 md:gap-4 flex-col">
                <span>31.12.2023 NYE COLDHOUSE<br/>
                  WARMINGHIDDEBIRTHDAYPARTY</span>

              <h2 className={'text-2xl md:text-5xl'}>RSVP</h2>

              <div className="flex items-center gap-4">
                <div
                  className="bg-red inline-block rounded-2xl md:px-4 px-3.5 md:rounded-3xl p-4">
                  <h3
                    className="text-white font-medium text-lg md:text-2xl leading-none">+2</h3>
                </div>
                <h6 className={'text-sm md:text-base'}>
                  bring your<br/>
                  girl+boyfriends!
                </h6>
              </div>
            </div>
            <div className="absolute h-full left-0 top-0">
              <svg xmlns="http://www.w3.org/2000/svg"
                   className="h-full left-0 top-0"
                   viewBox="0 0 316 170" fill="none">
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
                className="text-2xl absolute right-0 top-1/2 transform -translate-y-1/2 rotate-90">№000001</span>

            </div>

          </div>
          <h2 className="text-3xl md:text-4xl font-medium w-full right-0 top-0">
            get your special unique personalised party fissa ticket
          </h2>
          <p className="md:w-3/4 my-3">the long awaited cold house warming
            birthday
            (13-11) fissa @ de utrechtse bouwput with balcony and loopbrug is
            here!
            super excited to invite You and your Friend(s+2) to the best place
            to
            enjoy an oliebol, fireworks, music, and to perform your last 23 and
            first 2024
            dances 💃 ☺
            <br/><br/>Sincerely,<br/>hidde
          </p>

          <form
            action={getTicket}
            className="p-6 text-left flex flex-col border border-black mt-6 mb-10">
            <div className="flex flex-wrap gap-4 items-center">
              <div
                className="grid mb-2 w-full md:w-auto max-w-sm items-center gap-1.5">
                <Label htmlFor="email">your very personal name</Label>
                <Input required type="text" name={'name'} autoComplete={'fname'}
                       placeholder="Name"/>
              </div>
              <div
                className="grid mb-2 w-full md:w-auto max-w-sm items-center gap-1.5">
                <Label htmlFor="email">email (updates & confirmation)</Label>
                <Input name={'email'} type="email" id="email"
                       placeholder="Email"/>
              </div>
            </div>

            <div className="flex items-center space-x-2 mt-2 mb-4 md:m-0">
              <Checkbox disabled={!dinnerEnabled} name={'dinner'} id="dinner"/>
              <label
                htmlFor="dinner"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                join for dinner {!dinnerEnabled ? '– sold out :(' : ''}
              </label>
            </div>
            <SubmitButton/>
            <div className="ml-auto mt-2">
              <QandA/>
            </div>
          </form>
          <div
            className="flex text-right align-end gap-8 md:flex-nowrap flex-wrap">
            <div className="md:w-auto w-full pt-2 pl-4 border-t-4 border-black">
              <h5>ophaalbrug kasteel<br/>haverstraat 32 bis<br/>utrecht</h5>
            </div>
            <div className="md:w-auto w-full pt-2 pl-4 border-t-4 border-black">

              <h5>
                31.12.2023<br/>
                🍝 19:00 🍷 21:00<br/>
                🎆 00:00 💃 01:00<br/>
              </h5>
            </div>
          </div>
        </div>
      </div>
      <a target={'_blank'}
         className={'text-center mx-auto my-2 block opacity-20 !no-underline'}
         href="https://github.com/hiddehs/hidde.me">open source for my devnerds
        💙</a>
    </div>
  )
}
