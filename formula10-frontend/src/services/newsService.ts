import { NewsDTO } from '../dto/news.dto';
import apiClient from './axios';

export const getAllNews = async (page: number, size: number): Promise<NewsDTO[]> => {
    try {
        const response = await apiClient.get(`/api/news`, {
          params: {
            page: page,
            size: size,
          },
        });
        return response.data.content;  // A paginált hírek visszaadása
      } catch (error) {
        console.error('Error fetching news page:', error);
        throw error;
      }
};