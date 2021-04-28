package com.titan.edufinity.assessmentservice.controller;


import com.titan.edufinity.assessmentservice.service.AssessmentService;
import com.titan.edufinity.model.assessment.Assessment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/services/assessments")
public class AssessmentServiceController {

    @Autowired
    AssessmentService assessmentService;

    @PostMapping
    public Assessment save(@RequestBody Assessment assessment) {
        return assessmentService.save(assessment);
    }

    @GetMapping(value = "/{id}")
    public Assessment getAssessment(@PathVariable int id) {

        System.out.println("request came on "+ LocalDateTime.now() + " +++++++++");
        return assessmentService.findById(id);
    }

    @GetMapping
    public List<Assessment> getAllAssessments() {
        return assessmentService.findAll();
    }
}
