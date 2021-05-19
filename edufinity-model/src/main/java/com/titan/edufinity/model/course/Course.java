package com.titan.edufinity.model.course;

import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

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

    @OneToMany(targetEntity = QuizQuestion.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "course_id", referencedColumnName = "cid")
    private List<QuizQuestion> quizQuestionList;

}
