import apiClient from './axios';

export const registerUser = async (userData: any) => {
  try {
    const response = await apiClient.post('/api/users', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const checkUsernameAvailability = async (username: string) => {
  try {
    const response = await apiClient.get(`/api/users/check-username?username=${username}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};