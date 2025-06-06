import React from 'react';
import type { NewsDTO } from '../../dto/news.dto';
import { Months } from './Months.enum';
import { FaArrowRightLong } from "react-icons/fa6";
import { t } from 'i18next';

const News = ({news } : 
    {
        news: NewsDTO,
    }) => {

    const date = `${new Date(news.publishedAt).getFullYear().toString()}. ${t(`months.${(Months[new Date(news.publishedAt).getMonth() + 1]).toLowerCase().toString()}`)}. ${new Date(news.publishedAt).getDate().toString()}. ${new Date(news.publishedAt).getHours().toString()}:${new Date(news.publishedAt).getMinutes() < 10 ? `0${new Date(news.publishedAt).getMinutes().toString()}` : new Date(news.publishedAt).getMinutes().toString()}`;
    
    return (
        <div key={news.newsId} className="flex flex-col drop-shadow-lg rounded-md">
            <div className='w-full overflow-hidden rounded-t-sm' >
                <img src={news.imageUrl} alt={news.title}/>
            </div>
            <div className='w-full p-8 flex flex-col justify-between bg-white dark:bg-[--color-gray] rounded-b-md relative'>
                <p className='mb-4 font-semibold text-base text-center min-h-[6rem] xxl:min-h-[3rem]'>{news.title}</p>
                <p className='mb-4 text-xs sm:text-base lg:text-base xl:text-sm 2xl:text-base min-h-[20rem] text-justify'>{news.details}</p>
                <div className='flex justify-between items-center flex-col sm:flex-row absolute bottom-4 w-[calc(100%-4rem)]'>
                    <span className='text-xs text-[--color-gray-light]'>{date}</span>
                    <a href={news.sourceUrl} target="_blank" rel="noreferrer" 
                    className='text-sm text-nowrap text-[--color-primary] before:bg-[--color-primary] dark:text-[--color-purple-light] dark:before:bg-[--color-purple-light]'>
                        {t('home.readMore')} <FaArrowRightLong /></a>    
                </div>
            </div>
        </div>
    );
};

export default News;