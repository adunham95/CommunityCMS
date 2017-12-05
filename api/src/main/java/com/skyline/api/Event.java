package com.skyline.api;

import org.springframework.data.annotation.Id;

import java.util.Date;

public class Event {
    @Id
    private String name;
    private String description;
    private Date startDate;
    private String createdBy;

    public Event(String name, String description, Date startDate, String createdBy){
        this.name = name;
        this.description = description;
        this.startDate = startDate;
        this.createdBy = createdBy;
    }

    @Override
    public String toString() {
        return "Event{" +
                "name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", startDate=" + startDate +
                ", createdBy='" + createdBy + '\'' +
                '}';
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }
}
