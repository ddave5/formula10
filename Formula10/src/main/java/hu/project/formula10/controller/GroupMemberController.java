package hu.project.formula10.controller;

import hu.project.formula10.dto.GroupMemberDTO;
import hu.project.formula10.service.GroupMemberService;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
@RequestMapping("/api/groupMembers")
public class GroupMemberController {

    private final GroupMemberService groupMemberService;

    public GroupMemberController(GroupMemberService groupMemberService) {
        this.groupMemberService = groupMemberService;
    }

    @GetMapping("/{groupId}")
    public ResponseEntity<List<GroupMemberDTO>> getGroupMemberDTOByGroupId(@PathVariable Long groupId) {
        return ResponseEntity.ok(groupMemberService.getGroupMemberDTOByGroupId(groupId));
    }
    

    @DeleteMapping("/{groupId}/members/{userId}")
    public ResponseEntity<Void> removeMemberFromGroup(@PathVariable Long groupId, @PathVariable Long userId) {
        groupMemberService.removeMemberFromGroup(groupId, userId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{groupMemberId}/promote")
    public ResponseEntity<GroupMemberDTO> promoteMember( @PathVariable Long groupMemberId) {
        GroupMemberDTO member = groupMemberService.promoteMember(groupMemberId);
        return ResponseEntity.ok(member);
    }
}
