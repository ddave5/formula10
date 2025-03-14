import { GroupDTO } from '../dto/group.dto';
import apiClient from './axios';

export const createGroup = async (groupName: string, password: string, userId: number): Promise<GroupDTO> => {
  try {
    const response = await apiClient.post('/api/groups/create', {
      name: groupName,
      password,
      userId
    });
    return response.data;
  } catch (error) {
    console.error('Error creating group:', error);
    throw error;
  }
};


export const checkGroupName = async (name: string): Promise<boolean> => {
  try {
    const response = await apiClient.get<boolean>(`/api/groups/checkGroupName`, {
      params: { name }
    });
    return response.data;
  } catch (error) {
    console.error('Error checking group name:', error);
    throw error;
  }
};

export const getGroupListByUserId = async (userId: number): Promise<GroupDTO[]> => {
  try {
    const response = await apiClient.get<GroupDTO[]>(`/api/groups/getGroupListByUserId/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting group list:', error);
    throw error;
  }
}

export const getGroupList = async (): Promise<GroupDTO[]> => {
  try {
    const response = await apiClient.get<GroupDTO[]>(`/api/groups`);
    return response.data;
  } catch (error) {
    console.error('Error getting group list:', error);
    throw error;
  }
}

export const joinGroup = async (userId: number, groupId: number, password: string): Promise<GroupDTO> => {
  try {
    const response = await apiClient.post(`/api/groups/joinGroup`, { userId, groupId, password });
    return response.data;
  } catch (error) {
    console.error('Error joining group:', error);
    throw error;
  }
}

export const getGroupById = async (groupId: number): Promise<GroupDTO> => {
  try {
    const response = await apiClient.get<GroupDTO>(`/api/groups/${groupId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting group:', error);
    throw error;
  }
}

export const deleteGroup = async (groupId: number) => {
  try {
    await apiClient.delete(`/api/groups/${groupId}`);
    return true;
  } catch (error) {
    console.error('Failed to delete group:', error);
  }
}