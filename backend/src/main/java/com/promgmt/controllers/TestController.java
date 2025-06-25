package com.promgmt.controllers;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class TestController {
  @GetMapping("/all")
  public String allAccess() {
    return "Public Content.";
  }

  @GetMapping("/dev")
  @PreAuthorize("hasRole('DEVELOPER') or hasRole('MANAGER') or hasRole('SA')")
  public String userAccess() {
    return "Developer Content.";
  }

  @GetMapping("/pm")
  @PreAuthorize("hasRole('MANAGER') or hasRole('SA')")
  public String moderatorAccess() {
    return "Project Manager Board.";
  }

  @GetMapping("/admin")
  @PreAuthorize("hasRole('SA')")
  public String adminAccess() {
    return "SA Board.";
  }
}
