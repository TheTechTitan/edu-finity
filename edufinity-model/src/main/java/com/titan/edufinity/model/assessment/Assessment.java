package com.titan.edufinity.model.assessment;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "assessment")
@Data
public class Assessment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int aid;

    private int userId;
    private int courseId;
    private int score;
    private LocalDateTime attemptedDate;

    @OneToMany(mappedBy = "assessment")
    private List<QuizQuestion> quizQuestionList;
}
