import { GroupMemberDTO } from '../dto/groupMember.dto';
import apiClient from './axios';

export const getGroupMemberListByGroupId = async (groupId: number): Promise<GroupMemberDTO[]> => {
    try {
      const response = await apiClient.get<GroupMemberDTO[]>(`/api/groupMembers/${groupId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting group list:', error);
      throw error;
    }
  }

export const leaveGroup = async (groupId: number, userId: number) => {
  try {
    await apiClient.delete(`/api/groupMembers/${groupId}/members/${userId}`);
    return true;
  } catch (error) {
    console.error('Failed to leave group:', error);
  }
};