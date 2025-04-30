import type { TipDTO } from "../dto/tip.dto";
import apiClient from "./axios";

export const getTipsForGroupSeasonAndRace = async (groupId: number, seasonId: number, raceId: number) => {
  const response = await apiClient.get(`/tips/${groupId}/${seasonId}/${raceId}`);
  return response.data;
};

export const getUserTips = async (userId: number, groupId: number, seasonId: number, raceId: number) => {
  const response = await apiClient.get(`/tips/${groupId}/${seasonId}/${raceId}/user/${userId}`);
  return response.data;
};

export const createTip = async (tip: TipDTO) => {
  const response = await apiClient.post('/tips', tip);
  return response.data;
};

export const updateTip = async (id: number, tip: TipDTO) => {
  const response = await apiClient.put("/tips", tip);
  return response.data;
};

export const deleteTip = async (id: number) => {
  const response = await apiClient.delete(`/tips/${id}`);
  return response.data;
};

export const getGroupMembersTipExist = async (groupId: number) => {
  const response = await apiClient.get(`/tips/tipsFromGroup/${groupId}`);
  return response.data;
}