package com.promgmt.controllers;

import com.promgmt.models.Project;
import com.promgmt.payload.response.MessageResponse;
import com.promgmt.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    @Autowired
    private ProjectRepository projectRepository;

    @PostMapping("/create")
    @PreAuthorize("hasRole('MANAGER')")
    public ResponseEntity<?> createProject(@RequestBody Project project) {
        projectRepository.save(project);
        return ResponseEntity.ok(new MessageResponse("Project created successfully!"));
    }

    @GetMapping
    @PreAuthorize("hasRole('MANAGER')")
    public ResponseEntity<Page<Project>> getAllProjects(Pageable pageable) {
        Page<Project> projects = projectRepository.findAll(pageable);
        return ResponseEntity.ok(projects);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('MANAGER')")
    public ResponseEntity<Project> getProjectById(@PathVariable String id) {
        return projectRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('DEVELOPER') or hasRole('MANAGER')")
    public ResponseEntity<java.util.List<Project>> getAllProjectsList() {
        java.util.List<Project> projects = projectRepository.findAll();
        return ResponseEntity.ok(projects);
    }
}
