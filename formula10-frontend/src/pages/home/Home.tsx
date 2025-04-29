import type React from 'react';
import { useCallback, useEffect, useState } from 'react';
import type { NewsDTO } from '../../dto/news.dto';
import { getAllEnglishNews, getAllHungarianNews } from '../../services/news.service';
import News from '../../layout/news/News';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import { t } from 'i18next';
import eventBus from '../../services/eventBus';
import Loading from '../../components/Loading/Loading';

const Home: React.FC = () => {

    const [news, setNews] = useState<NewsDTO[]>([]);
    const [allNews, setAllNews] = useState<NewsDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(0); 
    const [hasMoreNews, setHasMoreNews] = useState<boolean>(true); 
    const {i18n} = useTranslation();
    const [visibleCount, setVisibleCount] = useState<number>(9);

    const showMoreNews = () => {
        const newVisibleCount = visibleCount + 9;
        const updatedNews = allNews.slice(0, newVisibleCount);
        setNews(updatedNews);
        setVisibleCount(newVisibleCount);

        if (newVisibleCount >= allNews.length) {
            setHasMoreNews(false);
        }
    };

    const fetchNews = useCallback(async (page: number) => {
        setLoading(true);
        try {
            const data = i18n.language === 'hu' ? await getAllHungarianNews() : await getAllEnglishNews();
            setAllNews(data);
            setNews(data.slice(0, 9));
            setVisibleCount(9);
        } catch (err) {
            eventBus.emit('error', {message: t('messages.errorFetching'), isDialog: true});
        } finally {
            setLoading(false);
        }
    }, [i18n.language]);

    useEffect(() => {
        setNews([]);
        setPage(0);
        setHasMoreNews(true);
        fetchNews(page);
    }, [page, fetchNews]);

    if (loading) {
        return <Loading isLoading={loading} />;
    }

    return (
        <>
            <div className='flex items-center justify-center mt-2 dark:bg-[--color-dark]'>
                <div className="w-2/3 grid gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mb-4">
                    {news.map((article, index) => (
                        <News
                            key={article.newsId}
                            news = {article}
                        />
                    ))}
                </div>
            </div>
            {hasMoreNews && !loading && (
                <div className="flex justify-center my-4">
                    <Button
                        variant='contained'
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        onClick={showMoreNews}
                    >
                        {t('home.moreButton')}
                    </Button>
                </div>
            )}
        </>
    );
};

export default Home;
