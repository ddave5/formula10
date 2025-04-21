import type { NewsDTO } from '../dto/news.dto';
import apiClient from './axios';

export const getAllHungarianNews = async (): Promise<NewsDTO[]> => {
  const response = await apiClient.get("/api/news/hungarian");
  return response.data;
};

export const getAllEnglishNews = async (): Promise<NewsDTO[]> => {
  const response = await apiClient.get("/api/news/english");
  return response.data;
};