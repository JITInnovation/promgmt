package com.promgmt.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "allocations")
public class Allocation {

    @Id
    private String id;

    @DBRef
    private User user;

    @DBRef
    private Project project;

    private Date assignmentDate;

    private Date endDate;

    private int percentage;

    public Allocation() {
    }

    public Allocation(User user, Project project, Date assignmentDate, Date endDate, int percentage) {
        this.user = user;
        this.project = project;
        this.assignmentDate = assignmentDate;
        this.endDate = endDate;
        this.percentage = percentage;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public Date getAssignmentDate() {
        return assignmentDate;
    }

    public void setAssignmentDate(Date assignmentDate) {
        this.assignmentDate = assignmentDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public int getPercentage() {
        return percentage;
    }

    public void setPercentage(int percentage) {
        this.percentage = percentage;
    }
}
