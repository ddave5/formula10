import type { GroupMemberDTO } from '../dto/groupMember.dto';
import apiClient from './axios';

export const getGroupMemberListByGroupId = async (groupId: number): Promise<GroupMemberDTO[]> => {
    try {
      const response = await apiClient.get<GroupMemberDTO[]>(`/groupMembers/${groupId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting group list:', error);
      throw error;
    }
  }

export const leaveGroup = async (groupId: number, userId: number) => {
  try {
    await apiClient.delete(`/groupMembers/${groupId}/members/${userId}`);
    return true;
  } catch (error) {
    console.error('Failed to leave group:', error);
  }
};

export const promoteMember = async (groupMemberId: number) => {
  try {
    await apiClient.put(`/groupMembers/${groupMemberId}/promote`);
    return true;
  } catch (error) {
    console.error('Failed to promote member:', error);
  }
};