package hu.project.formula10.service;

import hu.project.formula10.dto.GroupDTO;
import hu.project.formula10.dto.GroupMemberDTO;
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
import java.util.stream.Collectors;

@Service
public class GroupService {

    private final GroupRepository groupRepository;
    private final GroupMemberRepository groupMemberRepository;
    private final UserRepository userRepository;

    public GroupService(GroupRepository groupRepository, GroupMemberRepository groupMemberRepository, UserRepository userRepository) {
        this.groupRepository = groupRepository;
        this.groupMemberRepository = groupMemberRepository;
        this.userRepository = userRepository;
    }

    public GroupDTO createGroup(GroupDTO groupDTO) {
        User owner = userRepository.findById(groupDTO.getOwnerId()).orElseThrow(() -> new RuntimeException("Owner not found"));
        Group group = new Group();
        group.setName(groupDTO.getName());
        group.setOwner(owner);
        Group savedGroup = groupRepository.save(group);
        return savedGroup.toDTO();
    }

    public GroupDTO getGroupById(Long id) {
        return groupRepository.findById(id).orElseThrow(() -> new RuntimeException("Group not found")).toDTO();
    }

    public List<GroupDTO> getAllGroups() {
        return groupRepository.findAll().stream().map(Group::toDTO).toList();
    }


    public GroupMemberDTO addMemberToGroup(Long groupId, GroupMemberDTO groupMemberDTO) {
        // Tag felvétel logika
        Group group = groupRepository.findById(groupId).orElseThrow();
        User user = userRepository.findByUsername(groupMemberDTO.getUsername()).orElseThrow();

        GroupMember member = new GroupMember();
        member.setUser(user);
        member.setRole(GroupRole.valueOf(groupMemberDTO.getRole()));
        member.setJoinDate(groupMemberDTO.getJoinDate());
        member.setGroup(group);
        groupMemberRepository.save(member);
        return groupMemberDTO;
    }

    public List<GroupMemberDTO> getGroupMembers(Long groupId) {
        Group group = groupRepository.findById(groupId).orElseThrow();
        List<GroupMember> members = groupMemberRepository.findByGroup(group);
        return members.stream().map(GroupMember::toDTO).collect(Collectors.toList());
    }
}
