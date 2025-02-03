package hu.project.formula10.controller;

import hu.project.formula10.enums.GroupRole;
import hu.project.formula10.model.GroupMember;
import hu.project.formula10.service.GroupMemberService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/groupMembers")
public class GroupMemberController {

    private final GroupMemberService groupMemberService;

    public GroupMemberController(GroupMemberService groupMemberService) {
        this.groupMemberService = groupMemberService;
    }

    @PostMapping("/{groupId}/members/{userId}")
    public ResponseEntity<GroupMember> addMemberToGroup(@PathVariable Long groupId, @PathVariable Long userId, @RequestParam GroupRole role) {
        GroupMember groupMember = groupMemberService.addMemberToGroup(groupId, userId, role);
        return ResponseEntity.ok(groupMember);
    }

    @DeleteMapping("/{groupId}/members/{userId}")
    public ResponseEntity<Void> removeMemberFromGroup(@PathVariable Long groupId, @PathVariable Long userId) {
        groupMemberService.removeMemberFromGroup(groupId, userId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{groupId}/members")
    public ResponseEntity<List<GroupMember>> getMembersOfGroup(@PathVariable Long groupId) {
        List<GroupMember> members = groupMemberService.getMembersOfGroup(groupId);
        return ResponseEntity.ok(members);
    }
}
