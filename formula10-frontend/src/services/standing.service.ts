import { ConstructorStanding, DriverStanding } from "../interfaces/currentSeason";
import apiClient from "./axios";

export const getDriverStanding = async (seasonId: number): Promise<DriverStanding[] | null> => {
  try {
    const response = await apiClient.get<DriverStanding[]>(`/api/standings/driverStanding/${seasonId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch the driver standing:", error);
    throw error;
  }
};

export const getConstructorStanding = async (seasonId: number): Promise<ConstructorStanding[] | null> => {
    try {
      const response = await apiClient.get<ConstructorStanding[]>(`/api/standings/constructorStanding/${seasonId}`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch the driver standing:", error);
      throw error;
    }
};