import axios from 'axios';
// biome-ignore lint/style/useImportType: <explanation>
import { GroupDTO } from '../dto/group.dto';
import apiClient from './axios';

export const createGroup = async (groupName: string, password: string, userId: number): Promise<GroupDTO> => {
  try {
    const response = await apiClient.post('/groups/create', {
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
    const response = await apiClient.get<boolean>("/groups/checkGroupName", {
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
    const response = await apiClient.get<GroupDTO[]>(`/groups/getGroupListByUserId/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting group list:', error);
    throw error;
  }
}

export const getGroupList = async (): Promise<GroupDTO[]> => {
  try {
    const response = await apiClient.get<GroupDTO[]>("/groups");
    return response.data;
  } catch (error) {
    console.error('Error getting group list:', error);
    throw error;
  }
}

export const joinGroup = async (userId: number, groupId: number, password: string): Promise<GroupDTO> => {
  try {
    const response = await apiClient.post("/groups/joinGroup", { userId, groupId, password });
    return response.data;
  } catch (error) {
    console.error('Error joining group:', error);
    throw error;
  }
}

export const getGroupById = async (groupId: number): Promise<GroupDTO> => {
  try {
    const response = await apiClient.get<GroupDTO>(`/groups/${groupId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting group:', error);
    throw error;
  }
}

export const deleteGroup = async (groupId: number) => {
  try {
    await apiClient.delete(`/groups/${groupId}`);
    return true;
  } catch (error) {
    console.error('Failed to delete group:', error);
  }
}

export const renameGroupDB = async (groupId: number, newName: string) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/groups/${groupId}/rename`,
      newName,
      {
        headers: {
          'Content-Type': 'text/plain',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Failed to rename group:', error);
  }
}

export const changePasswordForGroup = async (groupId: number, password: string) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/groups/${groupId}/changePassword`,
      password, // Közvetlenül a stringet küldjük
      {
        headers: {
          'Content-Type': 'text/plain',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Failed to rename group:', error);
  }
}