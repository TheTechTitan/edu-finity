package com.titan.edufinity.model.course;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "course")
@Data
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cid;

    private String courseName;
    private String type;
    private String domain;

}
