package com.promgmt.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@Document(collection = "timesheets")
public class Timesheet {

    @Id
    private String id;

    private String userId;

    private String projectId;

    private LocalDate weekStartDate;

    private Map<String, Integer> hours = new HashMap<>();

    public Timesheet() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getProjectId() {
        return projectId;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }

    public LocalDate getWeekStartDate() {
        return weekStartDate;
    }

    public void setWeekStartDate(LocalDate weekStartDate) {
        this.weekStartDate = weekStartDate;
    }

    public Map<String, Integer> getHours() {
        return hours;
    }

    public void setHours(Map<String, Integer> hours) {
        this.hours = hours;
    }
}
