package com.titan.edufinity.assessmentservice.repository;


import com.titan.edufinity.model.assessment.Assessment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AssessmentRepository extends JpaRepository<Assessment,Integer> {
}
