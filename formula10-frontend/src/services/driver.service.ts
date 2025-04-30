import apiClient from "./axios";

export const getDriverList = async () => {
    const response = await apiClient.get("/drivers/");
    return response.data;
  };