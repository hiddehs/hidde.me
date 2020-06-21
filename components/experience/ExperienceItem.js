import ExperienceItemTags from './ExperienceItemTags'
import moment from 'moment'
import { Link, RichText, Date } from 'prismic-reactjs'

export default function ExperienceItem ({ data }) {
  return (
    <>
      <div
        className="experience-item mb-16 flex flex-no-wrap justify-between w-3/4">

        <div
          className="item-content flex flex-row items-start justify-start w-full lg:w-4/6 md:w-1/2">
          <div className={`logo mr-5 ${!data.logo && 'bg-primary'}`}>
            {data.logo && <img src={data.logo.url} alt=""/>}
          </div>
          <div className="content">
            <div className="title mb-2">
              <h6 className="mt-1">
                {data.title[0].text}
              </h6>
              <a className="text-gray-600 font-medium" target="_blank"
                 style={{ textDecoration: 'none' }} href={data.company_link &&
              data.company_link.url}>{data.company[0].text}</a>
            </div>
            <p className="description text-gray-800">
              {RichText.render(data.description)}
            </p>

            <ExperienceItemTags tags={data.tags} className="mt-3"/>
          </div>

        </div>
        <div className="item-timing h-full text-right">
          <h2 className="text-gray-300 font-normal pr-20 leading-none">{moment(
            data.start).year()} –</h2>
          <h1 className="text-gray-400" style={{ fontSize: '93px' }}>{(data.end
            ? moment(data.end).year()
            : 'now.')}</h1>
        </div>
      </div>
      <style jsx>
        {`
        .experience-item .logo {
          max-width: 64px;
          flex-shrink: 0;
          height: 64px;
          display: block;
        }
        .experience-item .logo img{
          width: 100%;
          height: 100%;
        }
        `}
      </style>
    </>
  )
}
