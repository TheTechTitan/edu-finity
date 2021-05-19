package com.titan.edufinity.model.assessment;

import com.titan.edufinity.model.course.QuizQuestion;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity(name = "assessment")
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

}
