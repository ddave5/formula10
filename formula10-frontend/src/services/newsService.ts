import { NewsDTO } from '../dto/news.dto';
import apiClient from './axios';

export const getAllNews = async (): Promise<NewsDTO[]> => {
    const response = await apiClient.get<NewsDTO[]>(`/api/news`);
    return response.data;
};