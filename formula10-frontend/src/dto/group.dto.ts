import type { GroupMemberDTO } from "./groupMember.dto";

export interface GroupDTO {
  id: number;
  name: string;
  members: GroupMemberDTO[];
  availability: string;
}