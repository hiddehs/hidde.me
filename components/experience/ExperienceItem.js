import ExperienceItemTags from './ExperienceItemTags'
import moment from 'moment'
import {RichText} from 'prismic-reactjs'

export default function ExperienceItem({data}) {
    return (
        <>
            <div
                className="experience-item mb-16 flex flex-col md:flex-row flex-no-wrap justify-between lg:w-3/4">
                <div
                    className="item-content flex flex-row items-start justify-start w-full lg:w-4/6 md:w-5/8">
                    <div className={`logo mr-5 ${!data.logo && 'bg-primary'}`}>
                        {data.logo && <img src={data.logo.url} alt=""/>}
                    </div>
                    <div className="content">
                        <div className="title mb-2 flex items-center justify-between flex-wrap">
                            <div>
                                <h6 className="mt-1">
                                    {data.title[0].text}
                                </h6>
                                <a className="text-gray-600 font-medium link hover:text-black" target="_blank"
                                   style={{textDecoration: 'none'}} href={data.company_link &&
                                    data.company_link.url}>{data.company[0].text}</a>
                            </div>
                            <div className={'flex-shrink mb-1'}>
                                <h6 className="text-gray-600 font-medium inline-flex items-center flex-wrap justify-end">{moment(data.start).year()} {data.end ? ' – ' + moment(data.end).year() : <span className="inline-block ml-3 my-1 px-2 py-1 pb-1.5 bg-gray-50 text-gray-800 align-middle rounded-sm leading-none transition duration-100 select-none hover:bg-gray-500"><i
                                    className={`tag-circle bg-primary position-relative animate-pulse`}></i>now</span>}</h6>
                            </div>
                        </div>
                        <div className="description text-gray-800">
                            {RichText.render(data.description)}
                        </div>

                        <ExperienceItemTags tags={data.tags} className="mt-3"/>
                    </div>

                </div>
            </div>
        </>
    )
}
