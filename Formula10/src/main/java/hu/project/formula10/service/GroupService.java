package hu.project.formula10.service;

import hu.project.formula10.dto.GroupDTO;
import hu.project.formula10.dto.GroupMemberDTO;
import hu.project.formula10.enums.GroupAvailability;
import hu.project.formula10.enums.GroupRole;
import hu.project.formula10.model.Group;
import hu.project.formula10.model.GroupMember;
import hu.project.formula10.model.User;
import hu.project.formula10.repository.GroupMemberRepository;
import hu.project.formula10.repository.GroupRepository;
import hu.project.formula10.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class GroupService {

    private final GroupRepository groupRepository;
    private final GroupMemberRepository groupMemberRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public GroupService(GroupRepository groupRepository, GroupMemberRepository groupMemberRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.groupRepository = groupRepository;
        this.groupMemberRepository = groupMemberRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public GroupDTO createGroup(String name, String rawPassword, Long userId) {
        if (groupRepository.existsByName(name)) {
            throw new IllegalArgumentException("Group name is already in use.");
        }

        Group group = new Group();
        group.setName(name);
        group.setPassword(passwordEncoder.encode(rawPassword));
        group.setCreatedAt(LocalDate.now());
        group.setAvailability(rawPassword == null || rawPassword.equals("") ? GroupAvailability.PUBLIC : GroupAvailability.PRIVATE);

        GroupMember groupMember = new GroupMember();
        groupMember.setUser(userRepository.findById(userId).orElseThrow(() -> new EntityNotFoundException("User not found")));
        groupMember.setRole(GroupRole.ADMIN);
        groupMember.setJoinDate(LocalDate.now());
        groupMember.setGroup(group);

        group.getMembers().add(groupMember);

        return groupRepository.save(group).toDTO();
    }

    public GroupDTO getGroupById(Long id) {
        return groupRepository.findById(id).orElseThrow(() -> new RuntimeException("Group not found")).toDTO();
    }

    public List<GroupDTO> getAllGroups() {
        return groupRepository.findAll().stream().map(Group::toDTO).toList();
    }


    @Transactional
    public void joinGroup(Long userId, Long groupId, String password) {
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new IllegalArgumentException("Group not found"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (!passwordEncoder.matches(password, group.getPassword())) {
            throw new IllegalArgumentException("Incorrect password for the group");
        }

        Optional<GroupMember> existingMember = groupMemberRepository.findByGroupAndUser(group, user);
        if (existingMember.isPresent()) {
            throw new IllegalArgumentException("User is already a member of the group");
        }

        GroupMember groupMember = new GroupMember();
        groupMember.setGroup(group);
        groupMember.setUser(user);
        groupMember.setRole(GroupRole.MEMBER);
        groupMember.setJoinDate(LocalDate.now());

        groupMemberRepository.save(groupMember);
    }

    public List<GroupMemberDTO> getGroupMembers(Long groupId) {
        Group group = groupRepository.findById(groupId).orElseThrow();
        List<GroupMember> members = groupMemberRepository.findByGroup(group);
        return members.stream().map(GroupMember::toDTO).collect(Collectors.toList());
    }

    public boolean isGroupNameTaken(String name) {
        return groupRepository.existsByName(name);
    }

    public List<GroupDTO> getGroupListByUserId(Long userId) {
        return groupRepository
                .findGroupListByUserId(userId)
                .stream()
                .map(Group::toDTO)
                .toList();
    }
}
