package com.promgmt.controllers;

import com.promgmt.models.Timesheet;
import com.promgmt.repositories.TimesheetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/timesheets")
public class TimesheetController {

    @Autowired
    private TimesheetRepository timesheetRepository;

    @GetMapping
    @PreAuthorize("hasRole('DEVELOPER')")
    public ResponseEntity<List<Timesheet>> getTimesheets(@RequestParam String userId, @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate weekStartDate) {
        List<Timesheet> timesheets = timesheetRepository.findByUserIdAndWeekStartDate(userId, weekStartDate);
        return ResponseEntity.ok(timesheets);
    }

    @PostMapping("/saveAll")
    @PreAuthorize("hasRole('DEVELOPER')")
    public ResponseEntity<?> saveAllTimesheets(@RequestBody List<Timesheet> timesheets) {
        if (timesheets != null && !timesheets.isEmpty()) {
            String userId = timesheets.get(0).getUserId();
            LocalDate weekStartDate = timesheets.get(0).getWeekStartDate();

            // First, delete all existing timesheets for this user and week
            timesheetRepository.deleteByUserIdAndWeekStartDate(userId, weekStartDate);

            // Filter out any placeholder rows without a project ID
            List<Timesheet> timesheetsToSave = timesheets.stream()
                .filter(ts -> ts.getProjectId() != null && !ts.getProjectId().isEmpty())
                .collect(java.util.stream.Collectors.toList());

            // Save the new set of timesheets
            if (!timesheetsToSave.isEmpty()) {
                timesheetRepository.saveAll(timesheetsToSave);
            }
            return ResponseEntity.ok("Timesheets saved successfully");
        }
        return ResponseEntity.ok("No timesheets to save.");
    }
}
