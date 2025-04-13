import apiClient from './axios';

export const registerUser = async (userData: any) :Promise<any> => {
  try {
    const response = await apiClient.post('/api/users', userData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const checkUsernameAvailability = async (username: string) => {
  try {
    const response = await apiClient.get(`/api/users/check-username?username=${username}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const checkEmailAvailability = async (email: string) => {
  try {
    const response = await apiClient.get(`/api/users/check-email?email=${email}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const changePasswordForUser = async (email: string, password: string) => {
  try {
    const response = await apiClient.put(`/api/users/changePassword`, { email, newPassword: password });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const changeEmail = async (email: string, userId: number) => {
  try {
    const response = await apiClient.put(`/api/users/changeEmail`, { email, userId: userId });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const checkOldPassword = async(oldPassword: string, userId: number) => {
  try {
    const response = await apiClient.get(`/api/users/${userId}/checkOldPassword?oldPassword=${oldPassword}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}