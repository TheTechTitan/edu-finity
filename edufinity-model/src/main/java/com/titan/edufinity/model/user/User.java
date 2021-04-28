package com.titan.edufinity.model.user;

import lombok.Data;

import javax.persistence.*;


@Entity
@Table(name = "user")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int uid;

    private String firstName;
    private String lastName;
    private String emailAddress;
    private String passWord;
    private String membership;

}
