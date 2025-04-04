package hu.project.formula10.controller;

import hu.project.formula10.dto.CreateGroupRequest;
import hu.project.formula10.dto.GroupDTO;
import hu.project.formula10.dto.GroupMemberDTO;
import hu.project.formula10.dto.JoinGroupRequest;
import hu.project.formula10.service.GroupService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/api/groups")
public class GroupController {

    private final GroupService groupService;

    public GroupController(GroupService groupService) {
        this.groupService = groupService;
    }

    @PostMapping("/create")
    public ResponseEntity<GroupDTO> createGroup(@RequestBody CreateGroupRequest createGroupRequest) {
        GroupDTO group = groupService.createGroup(createGroupRequest.getName(), createGroupRequest.getPassword(), createGroupRequest.getUserId());
        return ResponseEntity.ok(group);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GroupDTO> getGroupById(@PathVariable Long id) {
        GroupDTO group = groupService.getGroupById(id);
        return ResponseEntity.ok(group);
    }

    @GetMapping
    public ResponseEntity<List<GroupDTO>> getAllGroups() {
        List<GroupDTO> groupDTOList = groupService.getAllGroups();
        return ResponseEntity.ok(groupDTOList);
    }

    @PostMapping("/joinGroup")
    public ResponseEntity<GroupDTO> joinGroup(@RequestBody JoinGroupRequest joinGroupRequest) {
        try {
            GroupDTO groupDTO = groupService.joinGroup(joinGroupRequest.getUserId(), joinGroupRequest.getGroupId(), joinGroupRequest.getPassword());
            return ResponseEntity.ok(groupDTO);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @GetMapping("/{groupId}/members")
    public ResponseEntity<List<GroupMemberDTO>> getGroupMembers(@PathVariable Long groupId) {
        List<GroupMemberDTO> members = groupService.getGroupMembers(groupId);
        return ResponseEntity.ok(members);
    }

    @GetMapping("/checkGroupName")
    public ResponseEntity<Boolean> checkGroupName(@RequestParam String name) {
        boolean isAvailable = groupService.isGroupNameAvailable(name);
        return ResponseEntity.ok(isAvailable);
    }

    @GetMapping("/getGroupListByUserId/{userId}")
    public ResponseEntity<List<GroupDTO>> getGroupListByUserId(@PathVariable Long userId) {
        try {
            List<GroupDTO> groupDTOList = groupService.getGroupListByUserId(userId);
            return ResponseEntity.ok(groupDTOList);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ArrayList<>());
        }
    }

    @DeleteMapping("/{groupId}")
    public ResponseEntity<Void> deleteGroup(@PathVariable Long groupId) {
        groupService.deleteGroup(groupId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{groupId}/rename")
    public ResponseEntity<GroupDTO> renameGroup(@PathVariable Long groupId, @RequestBody String value) {
        GroupDTO entity = groupService.modifyGroupAttr(groupId, value, true);
        
        return ResponseEntity.ok(entity);
    }

    @PutMapping("/{groupId}/changePassword")
    public ResponseEntity<GroupDTO> changePassword(@PathVariable Long groupId, @RequestBody(required = false) String value) {
        GroupDTO entity = groupService.modifyGroupAttr(groupId, value, false);
        
        return ResponseEntity.ok(entity);
    }
}
