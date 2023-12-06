import { Metadata } from 'next'
import { Input } from '../../../@/components/ui/input'

export const metadata: Metadata = {
  title: 'hidde.me NYE',
}

export default function Page () {
  return (
    <div>


      <div className="w-full p-12">

        <div
          className="grid w-full xl:grid-cols-2 grid-cols-1 bg-primary p-10 gap-8">
          <div className="col-span-1">
            <div className={'pb-24 pt-4'}>
              <svg xmlns="http://www.w3.org/2000/svg" className={'max-h-[60vh]'}
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

            <div className="border-t-4 border-black pt-4">
              <h1>let's party New Year's!</h1>
            </div>


          </div>
          <div className="col-span-1 text-right flex flex-col h-full items-end">

            <div className="relative mt-auto font-medium right-[9.5rem] mb-12">
              <div
                className="ticket-left text-left w-full h-full justify-center pl-12 py-8 flex gap-4 flex-col">
                <h6>31.12.2023 NYE COLDHOUSE<br/>
                  WARMINGBIRTHDAYPARTY</h6>

                <h2>RSVP</h2>


                <div className="flex items-center gap-4">
                  <div className="bg-red inline-block rounded-3xl p-4"><h3
                    className="text-white font-medium">+2</h3></div>
                  <h6>
                    bring your<br/>
                    girl+boyfriends!
                  </h6>
                </div>
              </div>
              {/*  ticket*/}
              <svg xmlns="http://www.w3.org/2000/svg"
                   className="absolute h-full left-0 top-0"
                   viewBox="0 0 316 170" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M15.0875 4.08651L224.834 4.08651C226.851 11.2717 234.041 16.1846 242 16.5666V16.8856H243.775V16.5762C251.823 16.2769 259.13 11.3394 261.166 4.08651L300.305 4.08651C306.58 4.08651 311.667 9.17317 311.667 15.4479L311.666 66.7106C303.599 68.5195 297.777 76.0842 297.777 84.7866C297.777 93.489 303.599 101.054 311.666 102.863L311.667 154.912C311.667 161.187 306.58 166.273 300.305 166.273L260.265 166.273C258.455 159.134 251.549 154.15 243.775 153.484V152.196H242V153.409C233.524 153.409 225.681 158.595 223.735 166.273L15.0875 166.273C8.81281 166.273 3.72615 161.187 3.72615 154.912L3.72615 102.863C11.7941 101.054 17.6161 93.489 17.6161 84.7866C17.6161 76.0842 11.7941 68.5194 3.72615 66.7106L3.72615 15.4479C3.72615 9.17318 8.81282 4.08651 15.0875 4.08651ZM15.0875 0.360352L228.006 0.360352C228.229 7.29861 234.856 12.8645 243 12.8645C251.144 12.8645 257.771 7.29861 257.994 0.360352L300.305 0.360352C308.638 0.360352 315.393 7.11527 315.393 15.4479L315.393 66.3006V70.0268C307.721 70.0268 301.503 76.635 301.503 84.7866C301.503 92.9382 307.721 99.5464 315.393 99.5464V103.273L315.393 154.912C315.393 163.245 308.638 170 300.305 170L260.726 170H257C257 162.895 250.284 157.135 242 157.135C233.716 157.135 227 162.895 227 170H223.274L15.0875 170C6.75491 170 0 163.245 0 154.912L0 103.273L0 99.5464H7.43866e-05C7.67124 99.5464 13.8899 92.9382 13.8899 84.7866C13.8899 76.635 7.67124 70.0268 7.43866e-05 70.0268H0L0 66.3006L0 15.4479C0 7.11528 6.75492 0.360352 15.0875 0.360352ZM242 21.2504V25.6153H243.775V21.2504H242ZM242 29.9802V34.345L243.775 34.345V29.9802H242ZM242 38.7099V43.0747L243.775 43.0747V38.7099L242 38.7099ZM242 47.4396V51.8045L243.775 51.8045V47.4396L242 47.4396ZM242 56.1693V60.5342L243.775 60.5342V56.1693L242 56.1693ZM242 64.8991V69.2639H243.775L243.775 64.8991H242ZM242 73.6288V77.9937H243.775V73.6288H242ZM242 82.3585V86.7234H243.775V82.3585H242ZM242 91.0883V95.4531H243.775V91.0883H242ZM242 99.818V104.183H243.775V99.818H242ZM242 108.548V112.913H243.775V108.548H242ZM242 117.277V121.642H243.775V117.277H242ZM242 126.007V130.372L243.775 130.372V126.007H242ZM242 134.737V139.102L243.775 139.102V134.737L242 134.737ZM242 143.467L242 147.832H243.775L243.775 143.467H242Z"
                      fill="#FE4100"/>
              </svg>
            </div>


            <h2 className="font-medium w-full right-0">
              get your special unique personalised party fissa ticket.heif
            </h2>
            <div className="py-4">

              <Input type={'email'} placeholder={'email'}/>
              <a href={'#'}
                 className="btn ml-auto w-full text-center md:text-left md:w-auto"><span
                className="hs-icon link-arrow-right mr-1"></span> get ticket</a>

            </div>
            <div className="flex text-right align-end gap-8">
              <div className="w-auto pt-2 pl-4 border-t-4 border-black">

                <h5>haverstraat 32 bis<br/>utrecht</h5>
              </div>
              <div className="w-auto pt-2 pl-4 border-t-4 border-black">

                <h5>🍝 18:00 🍷 20:00<br/>
                  31.12.2023</h5>

              </div>
            </div>


          </div>
        </div>


      </div>

    </div>
  )
}
