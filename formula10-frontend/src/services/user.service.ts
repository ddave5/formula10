import apiClient from './axios';

export const registerUser = async (userData: { username: string, email: string, password: string }) :Promise< Map<string, boolean>> => {
  try {
    const response = await apiClient.post('/users', userData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const checkUsernameAvailability = async (username: string) => {
  try {
    const response = await apiClient.get(`/users/check-username?username=${username}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const checkEmailAvailability = async (email: string) => {
  try {
    const response = await apiClient.get(`/users/check-email?email=${email}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const changePasswordForUser = async (email: string, password: string) => {
  try {
    const response = await apiClient.put("/users/changePassword", { email, newPassword: password });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const changeEmail = async (email: string, userId: number) => {
  try {
    const response = await apiClient.put("/users/changeEmail", { email, userId: userId });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const checkOldPassword = async(oldPassword: string, userId: number) => {
  try {
    const response = await apiClient.get(`/users/${userId}/checkOldPassword?oldPassword=${oldPassword}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const deleteUserAccount = async (userId: number) => {
  try {
    await apiClient.delete(`/users/${userId}`);
    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const sendResetEmail = async (email: string) => {
  try {
    const response = await apiClient.post("/users/request-password-reset", { email });
    return response.data;
  } catch (error) {
    console.error("Error sending reset email", error);
    throw error;
  }
};

export const resetPassword = async (token: string, newPassword: string) => {
  try {
    const response = await apiClient.put("/users/reset-password", { token, newPassword });
    return response.data;
  } catch (error) {
    console.error("Error resetting password", error);
    throw error;
  }
};

export const validateResetToken = async (token: string) => {
  try {
    const response = await apiClient.get(`/users/validate-token/${token}`);
    return response.data; // Akkor is hasznos lehet, ha valamilyen meta adatot is visszaad a backend
  } catch (error) {
    console.error("Token validation failed", error);
    throw error;
  }
};