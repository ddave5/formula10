import type React from 'react';
import { useCallback, useEffect, useState } from 'react';
import type { NewsDTO } from '../../dto/news.dto';
import { getAllNews } from '../../services/news.service';
import News from '../../layout/news/News';
import _ from 'lodash'; // lodash importálása

const Home: React.FC = () => {

    const [news, setNews] = useState<NewsDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(0); 
    const [hasMoreNews, setHasMoreNews] = useState<boolean>(true); 

    const fetchNews = useCallback(async (page: number) => {
        setLoading(true);
        try {
            const data = await getAllNews(page, 9);
            if (data.length < 9) {
                setHasMoreNews(false);
            }
            setNews((prevNews) => [...prevNews, ...data]); 
        } catch (err) {
            setError('Failed to fetch news');
        } finally {
            setLoading(false);
        }
    }, []);

    // Fetch news whenever 'page' changes
    useEffect(() => {
        fetchNews(page);
    }, [page, fetchNews]);

    // Scroll esemény kezelése
    const handleScroll = useCallback(
        _.throttle(() => {
            if (
                window.innerHeight + window.scrollY >= document.body.offsetHeight - 300 &&
                !loading && hasMoreNews
            ) {
                setPage((prevPage) => prevPage + 1);
            }
        }, 200), [loading, hasMoreNews]);

    useEffect(() => {

        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, [handleScroll]); 


    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <div className='flex items-center justify-center mt-2 dark:bg-[--color-dark]' >
                <div className="w-2/3 grid gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mb-4">
                    {news.map((article, index) => (
                        <News
                            key={article.newsId}
                            news = {article}
                        />
                    ))}
                </div>
            </div>
            {loading && <div>Loading more news...</div>}
        </>
    );
};

export default Home;
