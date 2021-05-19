package com.titan.edufinity.assessmentservice.controller;


import com.titan.edufinity.assessmentservice.model.Response;
import com.titan.edufinity.assessmentservice.model.SimpleResponse;
import com.titan.edufinity.assessmentservice.service.AssessmentService;
import com.titan.edufinity.model.assessment.Assessment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3000/quiz/summary"})
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
    public Response getAssessment(@PathVariable int id, @RequestParam(required = false) String type) {

        System.out.println("request came on "+ LocalDateTime.now() + " +++++++++");
        if(type==null){
            return new SimpleResponse(assessmentService.findById(id));
        }else{
            return assessmentService.findDetailedResponse(id);
        }
    }

    @GetMapping
    public List<Assessment> getAllAssessments() {
        return assessmentService.findAll();
    }

    @GetMapping(value = "/user")
    public List<Assessment> getAssessmentByUser(@RequestParam(required = false) int id) {
        System.out.println("hit on new test 1"+ LocalDateTime.now() + " *******");
        return assessmentService.getAssessmentByUser(id);
    }

    @GetMapping(value = "/user/course")
    public List<Assessment> getAssessmentByUserCourse(@RequestParam(required = false) int id, @RequestParam(required = false) int cid) {
        System.out.println("hit on new test 2"+ LocalDateTime.now() + " *******");
        return assessmentService.getAssessmentByUserCourse(id,cid);
    }
}
