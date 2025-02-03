import React, { useEffect, useState } from 'react';
import { Position } from '../../layout/news/NewsPosition.enum';
import { NewsDTO } from '../../dto/news.dto';
import { getAllNews } from '../../services/newsService';
import News from '../../layout/news/News';

const Home: React.FC = () => {

    const [news, setNews] = useState<NewsDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }



    return (
        <>
            <div className='flex items-center justify-center mt-2'>
                <div className="w-2/3 grid grid-cols-2 gap-4">
                    {news.map((article) => (
                        <News
                            news = {article}
                            position={Position.left}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Home;