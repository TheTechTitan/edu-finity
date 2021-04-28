package com.titan.edufinity.model.assessment;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "quizQuestion")
@Data
public class QuizQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int qid;

    @ManyToOne
    @JoinColumn
    private Assessment assessment;

    private String question;
    private String[] answerSet = new String[4];
    private String correctAnswer;

}
