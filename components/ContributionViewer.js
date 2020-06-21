import moment from 'moment'

export default function ContributionViewer ({ contributions }) {
  let convertTimestamp = (rawIso) => {
    return moment(rawIso).format('DD HH:mm:ss')
  }
  return (
    <>
      <div className="contribution-viewer relative z-20">
        {contributions.slice(0, 3).map((contribution, date) =>
          <div key={contribution.id}
               className="contribution flex items-center justify-start row border-2 border-black border-solid bg-white p-4"
               style={{ width: '350px' }}>
            <div className="rounded-full bg-primary flex-shrink-0"
                 style={{ width: '46px', height: '46px' }}>
              <img src="" alt="" className={'w-full'}/>
            </div>
            {/*<div className="spacer ml-1 w-1 inline-block"/>*/}
            <div className="description ml-4">
              {/*{JSON.stringify(contribution)}*/}
              <div
                className="font-medium text-gray-900">{contribution.message &&
              contribution.message.substr(0, 20) +
              '...'}</div>
              <p className='text-gray-600 text-xs'>
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
