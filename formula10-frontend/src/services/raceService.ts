import { RaceDTO } from "../dto/race.dto";
import apiClient from "./axios";

export const getNextRace = async (): Promise<RaceDTO | null> => {
    try {
      const response = await apiClient.get<RaceDTO>('/api/races/next');
      return response.data;
    } catch (error) {
      console.error("Failed to fetch the next race:", error);
      return null;
    }
  };