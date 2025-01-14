package hu.project.formula10.controller;

import hu.project.formula10.dto.GroupDTO;
import hu.project.formula10.dto.GroupMemberDTO;
import hu.project.formula10.model.Group;
import hu.project.formula10.service.GroupService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/groups")
public class GroupController {

    private final GroupService groupService;

    public GroupController(GroupService groupService) {
        this.groupService = groupService;
    }

    @PostMapping
    public Group createGroup(@RequestBody GroupDTO groupDTO) {
        return groupService.createGroup(groupDTO);
    }

    @GetMapping("/{id}")
    public Group getGroupById(@PathVariable Long id) {
        return groupService.getGroupById(id);
    }

    @GetMapping
    public List<Group> getAllGroups() {
        return groupService.getAllGroups();
    }

    @PostMapping("/{groupId}/members")
    public ResponseEntity<GroupMemberDTO> addMemberToGroup(
            @PathVariable Long groupId,
            @RequestBody GroupMemberDTO groupMemberDTO) {
        GroupMemberDTO addedMember = groupService.addMemberToGroup(groupId, groupMemberDTO);
        return ResponseEntity.ok(addedMember);
    }
}
