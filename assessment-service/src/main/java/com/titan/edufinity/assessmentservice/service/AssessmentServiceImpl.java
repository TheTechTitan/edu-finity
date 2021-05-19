package com.titan.edufinity.assessmentservice.service;

import com.titan.edufinity.assessmentservice.model.DetailResponse;
import com.titan.edufinity.assessmentservice.repository.AssessmentRepository;
import com.titan.edufinity.model.assessment.Assessment;
import com.titan.edufinity.model.course.Course;
import com.titan.edufinity.model.user.User;
import org.hibernate.criterion.Example;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;

@Service
public class AssessmentServiceImpl implements AssessmentService{

    @Autowired
    AssessmentRepository assessmentRepository;

    @Bean
    RestTemplate getRestTemplate(RestTemplateBuilder builder){
        return builder.build();
    }

    @Autowired
    RestTemplate restTemplate;

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

    @Override
    public DetailResponse findDetailedResponse(int id) {

        //List<Assessment> AssessmentByUser= assessmentRepository.getAssessmentByUser()
        return null;
    }

    @Override
    public List<Assessment> getAssessmentByUser(int id) {

        List<Assessment> assessmentByUser= assessmentRepository.getAssessmentByUser(id);
        return assessmentByUser;
    }

    @Override
    public List<Assessment> getAssessmentByUserCourse(int id, int cid) {
        List<Assessment> assessmentByUserCourse= assessmentRepository.getAssessmentByUserCourse(id,cid);
        return assessmentByUserCourse;
    }


    private User getUser(int userId){
        User user=restTemplate.getForObject("http://localhost:9191/services/users/"+userId,User.class);
        return user;
    }

    private Course getCourse(int courseId){
        Course course=restTemplate.getForObject("http://localhost:9292/services/courses/"+courseId,Course.class);
        return course;
    }
}
