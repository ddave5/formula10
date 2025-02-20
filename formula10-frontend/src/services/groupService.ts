import apiClient from './axios';

const API_URL = process.env.REACT_APP_API_URL;

export const createGroup = async (groupName: string, password: string, userId: number): Promise<void> => {
  try {
    const response = await apiClient.post('/api/groups/create', {
      name: groupName,
      password,
      userId
    });
    return response.data;
  } catch (error) {
    console.error('Error creating group:', error);
    throw error;
  }
};


export const checkGroupName = async (name: string): Promise<boolean> => {
  try {
    const response = await apiClient.get<boolean>(`/api/groups/checkGroupName`, {
      params: { name }
    });
    return response.data;
  } catch (error) {
    console.error('Error checking group name:', error);
    throw error;
  }
};