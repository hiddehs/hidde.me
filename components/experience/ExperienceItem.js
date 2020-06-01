import ExperienceItemTags from './ExperienceItemTags'

export default function ExperienceItem ({ data, logo, title = 'Title', company = 'Company', description = 'After many years of having own radiostations and studio’s I thought\n' +
'            about making it easier to start with Visual Radio, for every\n' +
'            radiostation – from small to regional audience.', tags = [] }) {
  return (
    <>
      <div
        className="experience-item flex flex-row items-start justify-start w-full md:w-1/2 mb-16">
        <div className="logo mr-5">
          <img src={logo} alt=""/>
        </div>
        <div className="content">
          <div className="title mb-2">
            <h6 className="mt-1">
              {data.title[0].text}
            </h6>
            <p className="text-gray-600 font-medium">
              {data.company[0].text}
            </p>
          </div>
          <p className="description text-gray-800" dangerouslySetInnerHTML={{__html:data.description[0].text}}/>
          <ExperienceItemTags tags={data.tags} className="mt-3" />
        </div>
      </div>
      <style jsx>
        {`
        .experience-item .logo {
          background: gray;
          min-width: 64px;
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
