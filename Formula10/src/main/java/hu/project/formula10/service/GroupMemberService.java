package hu.project.formula10.service;

import hu.project.formula10.dto.GroupMemberDTO;
import hu.project.formula10.enums.GroupRole;
import hu.project.formula10.model.Group;
import hu.project.formula10.model.GroupMember;
import hu.project.formula10.model.User;
import hu.project.formula10.repository.GroupMemberRepository;
import hu.project.formula10.repository.GroupRepository;
import hu.project.formula10.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class GroupMemberService {

    private final GroupMemberRepository groupMemberRepository;
    private final GroupRepository groupRepository;
    private final UserRepository userRepository;

    public GroupMemberService(GroupMemberRepository groupMemberRepository, GroupRepository groupRepository, UserRepository userRepository) {
        this.groupMemberRepository = groupMemberRepository;
        this.groupRepository = groupRepository;
        this.userRepository = userRepository;
    }

    public void removeMemberFromGroup(Long groupId, Long userId) {
        log.info("Fetching group with id: {}", groupId);
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Group not found"));
        log.info("Fetching user with id: {}", userId);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        log.info("Delete member");
        GroupMember groupMember = groupMemberRepository.findByGroupAndUser(group, user)
                .orElseThrow(() -> new RuntimeException("Member not found"));

        groupMemberRepository.delete(groupMember);

        group.getMembers().remove(groupMember);

        if (group.getMembers().isEmpty()) {
            groupRepository.delete(group);
            return;
        } 

        group.getMembers().getFirst().setRole(GroupRole.ADMIN);
        groupRepository.save(group);
    }

    public List<GroupMemberDTO> getGroupMemberDTOByGroupId(Long groupId) {
        log.info("Fetching group members for group with id: {}", groupId);
        Group group = groupRepository.findById(groupId).orElseThrow(() -> new RuntimeException("Group not found"));
        List<GroupMember> groupMembers = groupMemberRepository.findByGroup(group);

        return groupMembers.stream().map(GroupMember::toDTO).toList();
    }

    public GroupMemberDTO promoteMember(Long groupMemberId) {
        log.info("Fetching group member with id: {}", groupMemberId);
        GroupMember groupMember = groupMemberRepository.findById(groupMemberId).orElseThrow(() -> new RuntimeException("Group member not found"));
        groupMember.setRole(GroupRole.ADMIN);

        return groupMemberRepository.save(groupMember).toDTO();
    }
        
}
