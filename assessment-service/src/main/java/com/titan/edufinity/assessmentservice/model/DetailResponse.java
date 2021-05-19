package com.titan.edufinity.assessmentservice.model;

import com.titan.edufinity.model.assessment.Assessment;
import com.titan.edufinity.model.course.Course;
import com.titan.edufinity.model.user.User;

public class DetailResponse implements Response {

    private User user;
    private Assessment assessment;
    private Course course;

    public DetailResponse(User user, Assessment assessment, Course course) {
        this.user = user;
        this.assessment = assessment;
        this.course = course;
    }

    public User getUser() {
        return user;
    }

    public Assessment getAssessment() {
        return assessment;
    }

    public Course getCourse() {
        return course;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setAssessment(Assessment assessment) {
        this.assessment = assessment;
    }

    public void setCourse(Course course) {
        this.course = course;
    }
}
