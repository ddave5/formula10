import React, { useCallback, useEffect, useState } from 'react';
import { NewsDTO } from '../../dto/news.dto';
import { getAllNews } from '../../services/newsService';
import News from '../../layout/news/News';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/Store';
import Loading from '../../components/Loading/Loading';

const Home: React.FC = () => {

    const [news, setNews] = useState<NewsDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(0); // Kezdő oldal
    const [hasMoreNews, setHasMoreNews] = useState<boolean>(true); // Jelzi, van-e még több hír

    const { user } = useSelector((state: RootState) => state.auth);

    const fetchNews = useCallback(async (page: number) => {
        try {
            const data = await getAllNews(page, 9); // Lekérjük a 9 hírt
            if (data.length < 9) {
                setHasMoreNews(false); // Ha kevesebb mint 9 hír jön, nincs több betöltendő
            }
            const fullNewsList = news.concat(data);
            setNews(fullNewsList); // Hírek hozzáadása a meglévőkhöz
        } catch (err) {
            setError('Failed to fetch news');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchNews(page);
    }, [page]);

    const handleScroll = useCallback( () => {
        // Ellenőrizzük, hogy közel van-e a felhasználó az oldal aljához
        if (
          window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && // 500px-re az oldal aljától
          !loading && hasMoreNews
        ) {
          setPage((prevPage) => prevPage + 1); // Következő oldal lekérdezése
        }
    }, []);

    useEffect(() => {
        // Eseményfigyelő hozzáadása a scroll eseményhez
        window.addEventListener('scroll', handleScroll);
    
        // Tisztítás a komponens leszerelésekor
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, [loading, hasMoreNews]); // Ha változik a töltési állapot vagy a hír elérhetősége

    if (loading) {
        return <Loading isLoading={loading} />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            {user ? <h1>Hello, {user.username}!</h1> : <h1>Welcome to the app!</h1>}
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