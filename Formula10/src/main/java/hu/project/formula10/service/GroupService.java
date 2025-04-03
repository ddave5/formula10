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
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
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
        log.info("Create group with name: {}", name);
        if (groupRepository.existsByName(name)) {
            throw new IllegalArgumentException("Group name is already in use.");
        }

        Group group = new Group();
        group.setName(name);
        group.setPassword(passwordEncoder.encode(rawPassword));
        group.setCreatedAt(LocalDate.now());
        group.setAvailability(rawPassword == null || rawPassword.equals("") ? GroupAvailability.PUBLIC : GroupAvailability.PRIVATE);

        log.info("Create group member with id: {}", userId);
        GroupMember groupMember = new GroupMember();
        groupMember.setUser(userRepository.findById(userId).orElseThrow(() -> new EntityNotFoundException("User not found")));
        groupMember.setRole(GroupRole.ADMIN);
        groupMember.setJoinDate(LocalDate.now());
        groupMember.setGroup(group);

        group.getMembers().add(groupMember);

        return groupRepository.save(group).toDTO();
    }

    public GroupDTO getGroupById(Long id) {
        log.info("Get group with id: {}", id);
        return groupRepository.findById(id).orElseThrow(() -> new RuntimeException("Group not found")).toDTO();
    }

    public List<GroupDTO> getAllGroups() {
        log.info("Get all groups");
        return groupRepository.findAll().stream().map(Group::toDTO).toList();
    }

    @Transactional
    public GroupDTO joinGroup(Long userId, Long groupId, String password) {
        log.info("Fetching group with id: {}", groupId);
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new IllegalArgumentException("Group not found"));

        log.info("Fetching user with id: {}", userId);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (!passwordEncoder.matches(password, group.getPassword())) {
            throw new IllegalArgumentException("Incorrect password for the group");
        }

        Optional<GroupMember> existingMember = groupMemberRepository.findByGroupAndUser(group, user);
        if (existingMember.isPresent()) {
            throw new IllegalArgumentException("User is already a member of the group");
        }

        log.info("Add user with id {} to group with id: {}", userId, groupId);
        GroupMember groupMember = new GroupMember();
        groupMember.setGroup(group);
        groupMember.setUser(user);
        groupMember.setRole(GroupRole.MEMBER);
        groupMember.setJoinDate(LocalDate.now());

        groupMemberRepository.save(groupMember);

        return group.toDTO();
    }

    public List<GroupMemberDTO> getGroupMembers(Long groupId) {
        log.info("Fetching group with id: {}", groupId);
        Group group = groupRepository.findById(groupId).orElseThrow( () -> new RuntimeException("Group not found"));
        List<GroupMember> members = groupMemberRepository.findByGroup(group);
        return members.stream().map(GroupMember::toDTO).collect(Collectors.toList());
    }

    public boolean isGroupNameAvailable(String name) {
        log.info("Checking group with name ({}) exists", name);
        return !groupRepository.existsByName(name);
    }

    public List<GroupDTO> getGroupListByUserId(Long userId) {
        log.info("Fetching groups for an user with id {}", userId);
        return groupRepository
                .findGroupListByUserId(userId)
                .stream()
                .map(Group::toDTO)
                .toList();
    }

    public void deleteGroup(Long groupId) {
        try {
            log.info("Delete group with id: {}", groupId);
            groupRepository.deleteById(groupId);
        } catch (RuntimeException e) {
            throw new RuntimeException("Group not found");
        }
    }

    public GroupDTO modifyGroupAttr(Long groupId, String value, boolean isRename) {
        log.info("Fetching group with id: {}", groupId);
        Group group = groupRepository.findById(groupId).orElseThrow(() -> new RuntimeException("Group not found"));
        if (isRename) {
            group.setName(value);
        } else {
            group.setPassword(passwordEncoder.encode(value));
            group.setAvailability(GroupAvailability.PRIVATE);
        }
        return groupRepository.save(group).toDTO();
    }
}
