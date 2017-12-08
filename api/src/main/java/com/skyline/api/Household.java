package com.skyline.api;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "households")
public class Household {
    @Id
    private String id;
    public String name;
    public String communityID;
    public Boolean admin;
    public String email;
    public String username;
    public String password;

    public Household(String name, Boolean admin, String email, String username, String password, String communityID) {
        this.name = name;
        this.communityID = communityID;
        this.admin = admin;
        this.email = email;
        this.username = username;
        this.password = password;
    }

    public Household(){}

    @Override
    public String toString() {
        return "Household{" +
                "name='" + name + '\'' +
                ", admin=" + admin + '\'' +
                ", email='" + email + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", communityID='" + communityID + '\'' +
                '}';
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCommunityID() {
        return communityID;
    }

    public void setCommunityID(String communityID) {
        this.communityID = communityID;
    }

    public Boolean getAdmin() {
        return admin;
    }

    public void setAdmin(Boolean admin) {
        this.admin = admin;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
