export default function WorkItem ({ image, video, title="work.", short_description="working on this.", link = 'company.com' }) {
  return (
    <>
      <div className="work-item w-full md:w-1/3">
        <div className="image">
          <img src={image} alt=""/>
          <video src={video} alt=""/>
        </div>
        <div className="content">
          <h5 className="title">
            {title}
          </h5>
          <div className="short-description font-medium text-gray-600 mb-3"
               dangerouslySetInnerHTML={{ __html: short_description }}></div>
          <a href={link} target="blank" className="font-medium link">{link.replace("https://","").replace("http://","")}</a><br/>
          <a href="#more" className="font-medium">Read more</a>
        </div>
      </div>
      <style jsx>
        {`
        .link{
          text-decoration: none;
        }
        .link::after{
          content:'';
          display:inline-block;
          width: 10px;
          height: 10px;
          margin-left: .2em;
          margin-top: -.2em;
          background: url('link-arrow.svg') center no-repeat;
          background-size: 9px;
          fill: red;
        }
        `}
      </style>
    </>
  )
}
