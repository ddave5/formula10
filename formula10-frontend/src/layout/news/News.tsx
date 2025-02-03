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
        <div key={news.newsId} className="h-[400px] flex items-center relative">
            <div className='h-[300px] w-2/3 rounded-lg p-8 border-2 border-gray-200 dark:border-gray-700 border-solid flex flex-col justify-between '>
                <h2 className='mb-2 font-semibold text-lg text-center'>{news.title}</h2>
                <p className='mb-2'>{news.details}</p>
                <div>
                    <span>{date}</span>
                    <a href={news.sourceUrl} target="_blank" rel="noreferrer">Read more <FaArrowRightLong /></a>    
                </div>
            </div>
            <div className='h-[200px] w-1/2'>
                <img src={news.imageUrl} alt={news.title} className='rounded-lg'/>
            </div>
        </div>
    );
};

export default News;