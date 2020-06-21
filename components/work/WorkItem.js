import { Date, RichText } from 'prismic-reactjs'

export default function WorkItem ({ data, video = '' }) {
  return (
    <>
      <div className="work-item w-full flex flex-col">
        <div className="image mb-4">
          {data.image_fallback
            ? <img style={{ maxHeight: 260, width: 'auto' }}
                   src={data.image_fallback.url} alt=""/>
            : ''}
          {data.video ? <video src={data.video} alt=""/> : ''}
        </div>
        <div className="content">
          <h6>
            {data.project_title[0].text}
          </h6>
          <p className={'short-description font-medium text-gray-600 my-1'}>
            {RichText.render(data.description_short)}
          </p>
        </div>
        <div className="footer mt-auto">
          {data.link ? <><a href={data.link.url} target="blank"
                            className="font-medium link">{data.link.url.replace(
            'https://', '').replace('http://', '')}</a><br/></> : ''}
          <a href="#more" className="font-medium">Read more</a>
        </div>
      </div>
      <style jsx>
        {`
        .link{
          text-decoration: none;
        }
        
        `}
      </style>
    </>
  )
}
