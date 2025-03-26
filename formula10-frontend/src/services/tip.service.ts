import { TipDTO } from "../dto/tip.dto";
import apiClient from "./axios";

export const getTipsForGroupSeasonAndRace = async (groupId: number, seasonId: number, raceId: number) => {
  const response = await apiClient.get(`/api/tips/${groupId}/${seasonId}/${raceId}`);
  return response.data;
};

export const getUserTips = async (userId: number, groupId: number, seasonId: number, raceId: number) => {
  const response = await apiClient.get(`/api/tips/${groupId}/${seasonId}/${raceId}/user/${userId}`);
  return response.data;
};

export const createTip = async (tip: TipDTO) => {
  const response = await apiClient.post('/api/tips', tip);
  return response.data;
};

export const updateTip = async (id: number, tip: TipDTO) => {
  const response = await apiClient.put(`/api/tips`, tip);
  return response.data;
};

export const deleteTip = async (id: number) => {
  const response = await apiClient.delete(`/api/tips/${id}`);
  return response.data;
};