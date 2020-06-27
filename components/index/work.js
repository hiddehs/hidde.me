import SectionWithTitle from '../SectionWithTitle'
import WorkItems from '../work/WorkItems'

export default function Work ({data, children }) {
  return (
    <>
      <SectionWithTitle title='work' subtitle='selected'>
        <WorkItems data={data}/>
        <div className="vertical-scrollbar my-6">
            <hr/>
        </div>
        <div className="bottom flex content-end">
          <a href={"#"} className="btn ml-auto w-full text-center md:text-left md:w-auto"><span className="hs-icon link-arrow-right mr-1"></span> show more work on hidde.dev</a>
        </div>
      </SectionWithTitle>
    </>
  )
}
