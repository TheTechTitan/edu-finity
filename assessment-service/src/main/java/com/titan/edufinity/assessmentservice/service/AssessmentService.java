package com.titan.edufinity.assessmentservice.service;


import com.titan.edufinity.model.assessment.Assessment;

import java.util.List;

public interface AssessmentService {

    Assessment save(Assessment assessment);
    Assessment findById(int id);
    List<Assessment> findAll();
}
