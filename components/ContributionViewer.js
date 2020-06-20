import moment from 'moment'

export default function ContributionViewer ({ contributions }) {
  let convertTimestamp = (rawIso) =>{
    return moment(rawIso).format("DD HH:mm:ss")
  }
  return (
    <>
      <div className="contribution-viewer relative z-20">
        {contributions.slice(0, 3).map((contribution, date) =>
          <div key={contribution.id}
               className="contribution flex items-center justify-start row border-2 border-black border-solid bg-white p-5">
            <img src="" alt="" className={'w-10'}/>
            <div className="spacer ml-1"/>
            <div className="description ">
              <div className="font-medium text-gray-900">{contribution.message &&
              contribution.message.substr(0, 20) +
              '...'}</div>
              <p className='text-gray-600 text-xs'>
                <span className="font-medium">{contribution.repository.name}</span> @ {convertTimestamp(contribution.authoredDate)}</p>
            </div>
          </div>,
        )}
      </div>
    </>
  )
}
