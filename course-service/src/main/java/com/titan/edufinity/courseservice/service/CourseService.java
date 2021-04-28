package com.titan.edufinity.courseservice.service;

import com.titan.edufinity.model.course.Course;


import java.util.List;

public interface CourseService {

    Course save(Course course);
    Course findById(int id);
    List<Course> findAll();
}
