package hu.project.formula10.service;

import hu.project.formula10.enums.GroupRole;
import hu.project.formula10.model.Group;
import hu.project.formula10.model.GroupMember;
import hu.project.formula10.model.User;
import hu.project.formula10.repository.GroupMemberRepository;
import hu.project.formula10.repository.GroupRepository;
import hu.project.formula10.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class GroupMemberService {

    private final GroupMemberRepository groupMemberRepository;
    private final GroupRepository groupRepository;
    private final UserRepository userRepository;

    public GroupMemberService(GroupMemberRepository groupMemberRepository, GroupRepository groupRepository, UserRepository userRepository) {
        this.groupMemberRepository = groupMemberRepository;
        this.groupRepository = groupRepository;
        this.userRepository = userRepository;
    }

    public GroupMember addMemberToGroup(Long groupId, Long userId, GroupRole role) {
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Group not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        GroupMember groupMember = new GroupMember(group, user, role, LocalDate.now());
        return groupMemberRepository.save(groupMember);
    }

    public void removeMemberFromGroup(Long groupId, Long userId) {
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Group not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        GroupMember groupMember = groupMemberRepository.findByGroupAndUser(group, user)
                .orElseThrow(() -> new RuntimeException("Member not found"));

        groupMemberRepository.delete(groupMember);
    }

    public List<GroupMember> getMembersOfGroup(Long groupId) {
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Group not found"));
        return groupMemberRepository.findByGroup(group);
    }
}
