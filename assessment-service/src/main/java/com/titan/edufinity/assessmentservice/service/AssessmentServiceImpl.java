package com.titan.edufinity.assessmentservice.service;

import com.titan.edufinity.assessmentservice.repository.AssessmentRepository;
import com.titan.edufinity.model.assessment.Assessment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AssessmentServiceImpl implements AssessmentService{

    @Autowired
    AssessmentRepository assessmentRepository;

    @Override
    public Assessment save(Assessment assessment) {
        return assessmentRepository.save(assessment);
    }

    @Override
    public Assessment findById(int id) {

        Optional<Assessment> assessment = assessmentRepository.findById(id);

        if(assessment.isPresent())
            return assessment.get();
        else
            return new Assessment();
    }

    @Override
    public List<Assessment> findAll() {
        return assessmentRepository.findAll();
    }
}
