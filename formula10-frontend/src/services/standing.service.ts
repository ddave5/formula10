import type { StandingDTO } from "../dto/standing.dto";
import type { ConstructorStanding, DriverStanding } from "../interfaces/currentSeason";
import apiClient from "./axios";

export const getDriverStanding = async (seasonId: number): Promise<DriverStanding[] | null> => {
  try {
    const response = await apiClient.get<DriverStanding[]>(`/standings/driverStanding/${seasonId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch the driver standing:", error);
    throw error;
  }
};

export const getConstructorStanding = async (seasonId: number): Promise<ConstructorStanding[] | null> => {
    try {
      const response = await apiClient.get<ConstructorStanding[]>(`/standings/constructorStanding/${seasonId}`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch the driver standing:", error);
      throw error;
    }
};

export const getGroupAndSeasonStanding = async (groupId: number): Promise<StandingDTO[] | null> => {
  try {
    const response = await apiClient.get<StandingDTO[]>(`/standings/${groupId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch the driver standing:", error);
    throw error;
  }
  
}