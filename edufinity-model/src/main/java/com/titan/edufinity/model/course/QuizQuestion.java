package com.titan.edufinity.model.course;

import com.titan.edufinity.model.assessment.Assessment;
import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "quizQuestion")
@Data
public class QuizQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int qid;

    //@ManyToOne
    //@JoinColumn
    //private Course course;

    private String question;
    private String[] options = new String[4];
    private String answer;

}
