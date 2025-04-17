import apiClient from "./axios";

export const getDriverList = async () => {
    const response = await apiClient.get("/api/drivers/");
    return response.data;
  };