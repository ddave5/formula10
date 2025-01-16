import React, { useEffect, useState } from 'react';
import { NewsDTO } from '../../dto/news.dto';
import { getAllNews } from '../../services/newsService';

const News: React.FC = () => {
    
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
        <div>
            <h1>Latest Formula 1 News</h1>
            <div className="news-list">
                {news.map((article) => (
                    <div key={article.newsId} className="news-item">
                        <h2>{article.title}</h2>
                        <img src={article.imageUrl} alt={article.title} style={{ width: '300px', height: '200px' }} />
                        <a href={article.sourceUrl} target="_blank" rel="noopener noreferrer">Read more</a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default News;