package com.titan.edufinity.assessmentservice.repository;


import com.titan.edufinity.model.assessment.Assessment;
import com.titan.edufinity.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AssessmentRepository extends JpaRepository<Assessment,Integer> {

    @Query("SELECT ud from assessment ud where ud.userId=?1")
    List<Assessment> getAssessmentByUser(int userId);

    @Query("SELECT ud from assessment ud where ud.userId=?1 and ud.courseId=?2")
    List<Assessment> getAssessmentByUserCourse(int id,int cid);
}
