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

import java.util.List;

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

    public Group createGroup(GroupDTO groupDTO) {

        Group group = new Group();
        group.setName(groupDTO.getName());

        return groupRepository.save(group);
    }

    public Group getGroupById(Long id) {
        return groupRepository.findById(id).orElseThrow(() -> new RuntimeException("Group not found"));
    }

    public List<Group> getAllGroups() {
        return groupRepository.findAll();
    }

    public void deleteGroupById(Long id) {
        groupRepository.deleteById(id);
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
}
