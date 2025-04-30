import apiClient from "./axios";

export const calculatePointsForGroup = async (groupId: number) => {
    try {
      await apiClient.get(`/scores/calculateforGroup/${groupId}`);
      return true;
    } catch (error) {
      console.error('Failed to calculate points for group:', error);
    }
  }