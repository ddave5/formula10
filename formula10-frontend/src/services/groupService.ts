import axios from 'axios';
import { GroupDTO } from '../dto/group.dto';
import { GroupMemberDTO } from '../dto/groupMember.dto';

const API_URL = process.env.REACT_APP_API_URL;

export const createGroup = async (groupDTO: GroupDTO) => {
  const response = await axios.post(`${API_URL}/groups`, groupDTO);
  return response.data;
};

export const addMemberToGroup = async (groupId: number, memberDTO: GroupMemberDTO) => {
  const response = await axios.post(`${API_URL}/groups/${groupId}/members`, memberDTO);
  return response.data;
};