import React, { useCallback, useEffect, useState } from 'react';
import { NewsDTO } from '../../dto/news.dto';
import { getAllNews } from '../../services/newsService';
import News from '../../layout/news/News';
import _ from 'lodash'; // lodash importálása

const Home: React.FC = () => {

    const [news, setNews] = useState<NewsDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(0); // Kezdő oldal
    const [hasMoreNews, setHasMoreNews] = useState<boolean>(true); // Jelzi, van-e még több hír

    // Hírek lekérése az oldal és méret alapján
    const fetchNews = useCallback(async (page: number) => {
        setLoading(true);
        try {
            const data = await getAllNews(page, 9); // Lekérjük a 9 hírt
            if (data.length < 9) {
                setHasMoreNews(false); // Ha kevesebb mint 9 hír jön, nincs több betöltendő
            }
            setNews((prevNews) => [...prevNews, ...data]); // Hírek hozzáadása a meglévőkhöz
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
              window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && // Az aljától 500px-re
              !loading && hasMoreNews
            ) {
              setPage((prevPage) => prevPage + 1); // Következő oldal lekérdezése
            }
        }, 200), [loading, hasMoreNews]); // Loading és hasMoreNews függőségek figyelése

    useEffect(() => {
        // Eseményfigyelő hozzáadása a scroll eseményhez
        window.addEventListener('scroll', handleScroll);
    
        // Tisztítás a komponens leszerelésekor
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, [handleScroll]); // `handleScroll` függőségek frissítése


    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <div className='flex items-center justify-center mt-2 dark:bg-[--color-dark]' >
                <div className="w-2/3 grid gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mb-4">
                    {news.map((article, index) => (
                        <News
                            key={index}
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
