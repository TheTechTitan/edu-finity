package com.titan.edufinity.assessmentservice.service;


import com.titan.edufinity.assessmentservice.model.DetailResponse;
import com.titan.edufinity.model.assessment.Assessment;

import java.util.List;

public interface AssessmentService {

    Assessment save(Assessment assessment);
    Assessment findById(int id);
    List<Assessment> findAll();

    DetailResponse findDetailedResponse(int id);

    List<Assessment> getAssessmentByUser(int id);
    List<Assessment> getAssessmentByUserCourse(int id,int cid);
}
