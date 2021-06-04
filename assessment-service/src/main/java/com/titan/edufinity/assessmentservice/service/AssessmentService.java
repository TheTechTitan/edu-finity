package com.titan.edufinity.assessmentservice.service;


import com.titan.edufinity.assessmentservice.model.DetailResponse;
import com.titan.edufinity.model.assessment.Assessment;

import java.util.List;
import java.util.concurrent.ExecutionException;

public interface AssessmentService {

    Assessment save(Assessment assessment);
    Assessment findById(int id);
    List<Assessment> findAll();

    DetailResponse findDetailedResponse(int id) throws ExecutionException, InterruptedException;

    List<Assessment> getAssessmentByUser(int id);
    List<Assessment> getAssessmentByUserCourse(int id,int cid);
}
