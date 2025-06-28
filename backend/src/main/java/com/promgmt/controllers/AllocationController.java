package com.promgmt.controllers;

import com.promgmt.models.Allocation;
import com.promgmt.models.Project;
import com.promgmt.models.User;
import com.promgmt.models.ERole;
import com.promgmt.payload.request.AllocationRequest;
import com.promgmt.payload.response.MessageResponse;
import com.promgmt.repositories.AllocationRepository;
import com.promgmt.repositories.ProjectRepository;
import com.promgmt.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/allocations")
public class AllocationController {

    @Autowired
    private AllocationRepository allocationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @PostMapping("/create")
    @PreAuthorize("hasRole('MANAGER')")
    public ResponseEntity<?> createAllocation(@RequestBody AllocationRequest allocationRequest) {
        User user = userRepository.findById(allocationRequest.getUserId()).orElse(null);
        if (user == null) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: User not found."));
        }

        Project project = projectRepository.findById(allocationRequest.getProjectId()).orElse(null);
        if (project == null) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Project not found."));
        }

        List<Allocation> overlappingAllocations = allocationRepository.findOverlappingAllocations(
                user.getId(), allocationRequest.getAssignmentDate(), allocationRequest.getEndDate());

        int totalPercentage = overlappingAllocations.stream().mapToInt(Allocation::getPercentage).sum();

        if (totalPercentage + allocationRequest.getPercentage() > 100) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: User allocation cannot exceed 100%."));
        }

        Allocation allocation = new Allocation(
                user,
                project,
                allocationRequest.getAssignmentDate(),
                allocationRequest.getEndDate(),
                allocationRequest.getPercentage()
        );

        allocationRepository.save(allocation);

        return ResponseEntity.ok(new MessageResponse("Resource allocated successfully!"));
    }

    @GetMapping("/resources")
    @PreAuthorize("hasRole('MANAGER')")
    public ResponseEntity<List<User>> getAssignableUsers() {
        List<User> users = userRepository.findAll().stream()
                .filter(user -> user.getRoles().stream()
                        .noneMatch(role -> role.getName().equals(ERole.ROLE_MANAGER) || role.getName().equals(ERole.ROLE_SA)))
                .collect(Collectors.toList());
        return ResponseEntity.ok(users);
    }
    
    @GetMapping("/project/{projectId}")
    @PreAuthorize("hasRole('MANAGER')")
    public ResponseEntity<List<Allocation>> getAllocationsByProject(@PathVariable String projectId) {
        List<Allocation> allocations = allocationRepository.findByProjectId(projectId);
        return ResponseEntity.ok(allocations);
    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("hasRole('DEVELOPER') or hasRole('MANAGER')")
    public ResponseEntity<List<Allocation>> getAllocationsByUser(@PathVariable String userId) {
        List<Allocation> allocations = allocationRepository.findByUserId(userId);
        return ResponseEntity.ok(allocations);
    }
}
