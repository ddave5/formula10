import axios from 'axios';
import { NewsDTO } from '../dto/news.dto';

const API_BASE_URL = process.env.REACT_APP_API_URL + '/api/news';

export const getAllNews = async (): Promise<NewsDTO[]> => {
    const response = await axios.get<NewsDTO[]>(API_BASE_URL);
    return response.data;
};