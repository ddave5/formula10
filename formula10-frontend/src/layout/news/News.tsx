import React from 'react';
import { NewsDTO } from '../../dto/news.dto';
import { Position } from './NewsPosition.enum';
import { Months } from './Months.enum';
import { FaArrowRightLong } from "react-icons/fa6";

const News = ({news, position } : 
    {
        news: NewsDTO,
        position: Position 
    }) => {

    let date = new Date(news.publishedAt).getFullYear().toString() + ". " 
    + (Months[new Date(news.publishedAt).getMonth() + 1]).toString() + ". "
    + new Date(news.publishedAt).getDate().toString() + ". "
    + new Date(news.publishedAt).getHours().toString() + ":"
    + new Date(news.publishedAt).getMinutes().toString();
    
    return (
        <div key={news.newsId} className="flex flex-col drop-shadow-lg border-2 border-gray-200 dark:border-gray-700 border-solid rounded-md ">
            <div className='w-full overflow-hidden rounded-t-sm'>
                <img src={news.imageUrl} alt={news.title}/>
            </div>
            <div className='h-[350px] w-full p-8 flex flex-col justify-between bg-white dark:bg-[--color-gray] rounded-b-md'>
                <p className='mb-4 font-semibold text-base text-center'>{news.title}</p>
                <p className='mb-4 text-xs sm:text-base lg:text-base xl:text-sm 2xl:text-base'>{news.details}</p>
                <div className='flex justify-between items-center flex-col sm:flex-row'>
                    <span className='text-xs text-[--color-gray-light]'>{date}</span>
                    <a href={news.sourceUrl} target="_blank" rel="noreferrer" 
                    className='text-sm text-nowrap text-[--color-primary] before:bg-[--color-primary] dark:text-[--color-purple-light] dark:before:bg-[--color-purple-light]'>
                        Read more <FaArrowRightLong /></a>    
                </div>
            </div>
        </div>
    );
};

export default News;