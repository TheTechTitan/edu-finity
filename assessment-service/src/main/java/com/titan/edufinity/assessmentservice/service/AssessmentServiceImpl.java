package com.titan.edufinity.assessmentservice.service;


import com.netflix.hystrix.HystrixCommand;
import com.titan.edufinity.assessmentservice.hystrix.CommonHystrixCommand;
import com.titan.edufinity.assessmentservice.model.DetailResponse;
import com.titan.edufinity.assessmentservice.repository.AssessmentRepository;
import com.titan.edufinity.model.assessment.Assessment;
import com.titan.edufinity.model.course.Course;
import com.titan.edufinity.model.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;

@Service
public class AssessmentServiceImpl implements AssessmentService{

    private String accessToken="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJCYXJyeTEyMyIsImV4cCI6MTYyMjg0NDc0MywiaWF0IjoxNjIyODA4NzQzfQ.nGtG5XngzeDPQPMpLsVZQ9PnYASV0s0buHdlc2UWN0U";
    private String courseApi="http://course/services/courses/";
    private String userApi= "http://user/services/users/";

    @Autowired
    AssessmentRepository assessmentRepository;

    @LoadBalanced
    @Bean
    RestTemplate getRestTemplate(RestTemplateBuilder builder){
        return builder.build();
    }

    @Autowired
    RestTemplate restTemplate;

    HttpHeaders headers = new HttpHeaders();

    @Autowired
    HystrixCommand.Setter setter;

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
    public List<Assessment> getAssessmentByUser(int id) {

        List<Assessment> assessmentByUser= assessmentRepository.getAssessmentByUser(id);
        return assessmentByUser;
    }

    @Override
    public List<Assessment> getAssessmentByUserCourse(int id, int cid) {
        List<Assessment> assessmentByUserCourse= assessmentRepository.getAssessmentByUserCourse(id,cid);
        return assessmentByUserCourse;
    }

    @Override
    public DetailResponse findDetailedResponse(int id) throws ExecutionException, InterruptedException {

        Assessment assessment= findById(id);
        User user=getUser(assessment.getUserId());
        Course course=getCourse(assessment.getCourseId());

        return new DetailResponse(user,assessment,course);
    }

    private User getUser(int userId) throws ExecutionException, InterruptedException {

        headers.set("Authorization", "Bearer " + accessToken);
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        CommonHystrixCommand<User> userCommonHystrixCommand=new CommonHystrixCommand<>(setter,()->
        {
            ResponseEntity<User> response=restTemplate.exchange(userApi+userId, HttpMethod.GET,  entity,User.class);
            return response.getBody();
        },()-> new User());

        Future<User> userFuture=userCommonHystrixCommand.queue();
        return userFuture.get();
    }

    private Course getCourse(int courseId) throws ExecutionException, InterruptedException {

        CommonHystrixCommand<Course> courseCommonHystrixCommand=new CommonHystrixCommand<>(setter,()->
        {
            return restTemplate.getForObject(courseApi+courseId,Course.class);

        },()-> new Course());

        Future<Course> courseFuture=courseCommonHystrixCommand.queue();
        return courseFuture.get();
    }
}
