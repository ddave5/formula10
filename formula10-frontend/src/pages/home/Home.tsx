import React, { useEffect, useState } from 'react';
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

    const { user } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const data = await getAllNews();
                setNews(data);
            } catch (err) {
                setError('Failed to fetch news');
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

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
                    {news.map((article) => (
                        <News
                            key={article.newsId}
                            news = {article}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Home;