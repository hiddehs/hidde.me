import { Date, RichText } from 'prismic-reactjs'
import LazyLoad from 'react-lazyload'

export default function WorkItem ({ data, video = '' }) {



  // if (process.browser) {
  //   console.log("domcontent lsitener")
  //   document.addEventListener('DOMContentLoaded', function () {
  //     console.log("dom content loaded")
  //     var lazyVideos = [].slice.call(document.querySelectorAll('video.lazy'))
  //
  //     if ('IntersectionObserver' in window) {
  //       var lazyVideoObserver = new IntersectionObserver(
  //         function (entries, observer) {
  //           entries.forEach(function (video) {
  //             if (video.isIntersecting) {
  //               for (var source in video.target.children) {
  //                 var videoSource = video.target.children[source]
  //                 if (typeof videoSource.tagName === 'string' &&
  //                   videoSource.tagName === 'SOURCE') {
  //                   videoSource.src = videoSource.dataset.src
  //                 }
  //               }
  //
  //               video.target.load()
  //               video.target.classList.remove('lazy')
  //               lazyVideoObserver.unobserve(video.target)
  //             }
  //           })
  //         })
  //
  //       lazyVideos.forEach(function (lazyVideo) {
  //         lazyVideoObserver.observe(lazyVideo)
  //       })
  //     }
  //   })
  // }

  return (
    <>
      <div className="work-item">
        <div className="image mb-4">
          {(data.video)?
            <LazyLoad><video className="absolute z-20 lazy" muted playsInline loop
                             autoPlay={true} poster={data.image_fallback.url}>
              <source src={data.video.url}/>
            </video></LazyLoad> :
            (data.image_fallback ? <img style={{
            maxHeight: 260,
            width: 'auto',
          }}
            className="relative z-10"
            src={data.image_fallback.url} alt=""/>
            : '')

          }}
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
          {/*<a href="#more" className="font-medium">Read more</a>*/}
        </div>
      </div>
      <style jsx>
        {`
        .work-item .image{
          //min-height: 290px;
          padding-bottom: 65%;
          position: relative;
          width: 100%;
          overflow: hidden;
        }
        .work-item .image img, .work-item .image video{
          object-fit: cover;
          position:absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
          min-height: 100%;
          min-width: 100%;
          height: 100%;
        }
        .link{
          text-decoration: none;
        }
        
        `}
      </style>
    </>
  )
}
