package com.promgmt.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "projects")
public class Project {

    @Id
    private String id;

    private String projectName;
    private Date startDate;
    private Date endDate;
    private int programmersRequired;
    private int testersRequired;
    private int projectLeadsRequired;
    private String releaseQuarter;
    private int releaseYear;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public int getProgrammersRequired() {
        return programmersRequired;
    }

    public void setProgrammersRequired(int programmersRequired) {
        this.programmersRequired = programmersRequired;
    }

    public int getTestersRequired() {
        return testersRequired;
    }

    public void setTestersRequired(int testersRequired) {
        this.testersRequired = testersRequired;
    }

    public int getProjectLeadsRequired() {
        return projectLeadsRequired;
    }

    public void setProjectLeadsRequired(int projectLeadsRequired) {
        this.projectLeadsRequired = projectLeadsRequired;
    }

    public String getReleaseQuarter() {
        return releaseQuarter;
    }

    public void setReleaseQuarter(String releaseQuarter) {
        this.releaseQuarter = releaseQuarter;
    }

    public int getReleaseYear() {
        return releaseYear;
    }

    public void setReleaseYear(int releaseYear) {
        this.releaseYear = releaseYear;
    }
}
