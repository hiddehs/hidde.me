"use client"
import { RichText } from 'prismic-reactjs'
import LazyLoad from 'react-lazy-load'
export default function WorkItem ({ data, video = '' }) {
  return (
    <>
      <div className="work-item flex flex-col">
        <div
          className="image mb-4  hover:opacity-80 transition duration-200 transition-ease-in cursor-pointer"
          onClick={() => window.open(data.link.url)}>
          {(data.video) ?
            <LazyLoad>
              <video className="absolute z-20 lazy" muted playsInline loop
                     autoPlay={true} poster={data.image_fallback.url}>
                <source src={data.video.url}/>
              </video>
            </LazyLoad> :
            (data.image_fallback ?
              <LazyLoad><img style={{
                maxHeight: 260,
                width: 'auto',
              }}
                              className="relative z-10"
                              src={data.image_fallback.url} alt=""></img>
              </LazyLoad>
              : '')
          }
        </div>
        <div className="content">
          <h6>
            {data.project_title[0].text}
          </h6>
          <div className={'short-description font-medium text-gray-600 my-1'}>
            {RichText.render(data.description_short)}
          </div>
        </div>
        <div className="footer mt-auto">
          {data.link ? <><a href={data.link.url} target="blank"
                            className="font-medium link hover:opacity-60 hover:text-black">{data.link.url.replace(
            'https://', '').replace('http://', '')}</a><br/></> : ''}
          {/*<a href="#more" className="font-medium">Read more</a>*/}
        </div>
      </div>
    </>
  )
}
