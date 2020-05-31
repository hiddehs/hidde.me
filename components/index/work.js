import SectionWithTitle from '../SectionWithTitle'
import WorkItems from '../work/WorkItems'

export default function Work ({ children }) {
  return (
    <>
      <SectionWithTitle title='work'>
        <WorkItems/>
        <div className="vertical-scrollbar my-6">
            <hr/>
        </div>
        <div className="bottom flex content-end">
          <a href={"#"} className="btn ml-auto">show more work on hidde.dev</a>
        </div>
      </SectionWithTitle>
    </>
  )
}
