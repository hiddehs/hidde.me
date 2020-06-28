import moment from 'moment'

export default function ContributionViewer ({ contributions, location }) {
  let convertTimestamp = (rawIso) => {
    return moment(rawIso).format('MM-DD HH:mm:ss')
  }
  let activeIndex = contributions.slice(0, 3).length - 1
  return (
    <>
      <div className={`contribution-viewer md:absolute relative z-20 ${location}`}>
        {contributions.slice(0, 3).reverse().map((contribution, i) =>
          <div key={contribution.id}
               className={`contribution flex bg-white items-center justify-start row border-2 border-black border-solid bg-white p-4 ${(i ===
                 activeIndex) ? 'active-contribution' : ('index-' + i)}`}
               style={{ width: '350px' }}>
            <div className="rounded-full bg-primary flex-shrink-0"
                 style={{ width: '46px', height: '46px' }}>
              <img src="" alt="" className={'w-full'}/>
            </div>
            <div className="description ml-4">
              <div
                className="font-medium text-gray-900">{contribution.message &&
              contribution.message.substr(0, 23) +
              '...'}</div>
              <p className='text-gray-600 text-xs'>
                <span style={{ width: '13px', verticalAlign: 'baseline' }}
                      className={`hs-icon mr-1 social-${contribution.type}`}/>
                <span
                  className="font-medium">{contribution.repository.name}</span> @ {convertTimestamp(
                contribution.authoredDate)}</p>
            </div>
          </div>,
        )}
      </div>
    </>
  )
}
