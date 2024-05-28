package com.oshada.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * to define an entity
 */
@Entity
@Table(name = "User")
public class User {

    /**
     * @Id annotation to make id variable as Primary key
     */
    @Id
    @Column(name = "email", length = 50)
    private String email;

    @Column(name = "name")
    private String name;

    @Column(name = "password")
    private String password;

    @Column(name= "role" )
    private Role role = Role.USER;


    /**
     * default constructor
     */
    public User() {
        super();
    }

    /**
     * parameterized constructor
     */
    public User(String id, String password, Role role, String name) {
        super();
        this.email = id;
        this.password = password;
        this.role = role;
        this.name = name;
    }


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
