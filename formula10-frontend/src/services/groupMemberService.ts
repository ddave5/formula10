import { GroupMemberDTO } from '../dto/groupMember.dto';
import apiClient from './axios';

export const getGroupMemberListByGroupId = async (groupId: number): Promise<GroupMemberDTO[]> => {
    try {
      const response = await apiClient.get<GroupMemberDTO[]>(`/api/groups/${groupId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting group list:', error);
      throw error;
    }
  }