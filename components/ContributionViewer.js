import moment from 'moment'

export default function ContributionViewer ({ contributions }) {
  let convertTimestamp = (rawIso) => {
    return moment(rawIso).format('MM-DD HH:mm:ss')
  }
  let activeIndex = (contributions) ? contributions.slice(0, 3).length - 1 : 0
  return (
    <>
      <div
        className={`contribution-viewer grid grid-cols-1 ${contributions &&
        contributions.length > 5
          ? 'md:grid-cols-11'
          : 'md:grid-cols-9'} gap-4 z-20 mb-5 md:mb-0 md:py-5`}>
        {/*{contributions.length > 0 ? {*/}

        {(contributions && contributions.length > 0) ? <>
          {contributions.slice(0, 3).map((contribution, i) =>
              <div key={contribution.id}
                   className={`contribution col-span-3 flex bg-white items-center justify-start row border-2 border-black border-solid bg-white p-4 ${(i ===
                     activeIndex) ? 'active-contribution' : ('index-' + i)}`}>
                <div className="rounded-full bg-primary flex-shrink-0"
                     style={{ width: '46px', height: '46px' }}>
                  <img src="" alt="" className={'w-full'}/>
                </div>
                <div className="description ml-4"
                     style={{ maxWidth: 'calc(100% - 46px - 1rem)' }}>
                  <div
                    className="font-medium text-gray-900 truncate">{contribution.message}</div>
                  <p className='text-gray-600 text-xs'>
          <span style={{ width: '13px', verticalAlign: 'baseline' }}
                className={`hs-icon mr-1 social-${contribution.type}`}/>
                    <span
                      className="font-medium">{contribution.repository.name}</span> @ {convertTimestamp(
                    contribution.authoredDate)}</p>
                </div>
              </div>,
          )}
          {contributions.length > 5 &&
          <div
            className="bg-white col-span-2 text-center border-2 border-gray-600 text-gray-600 border-solid flex justify-center items-center p-4">
            <p>+{contributions.length - 3} more contributions</p>
          </div>}
        </> : <>
          <div
            className="bg-white col-span-6 text-center border-2 border-gray-600 text-gray-600 border-solid flex justify-center items-center p-4">
            <div className="text-center">
              <p>no contributions on this day</p>
              <p className="text-gray-500 text-sm">(hidde had some time off
                😴)</p>
            </div>
          </div>
        </>
        }
      </div>
    </>
  )
}
