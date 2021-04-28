package com.titan.edufinity.courseservice.controller;


import com.titan.edufinity.courseservice.service.CourseService;
import com.titan.edufinity.model.course.Course;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;


@RestController
@RequestMapping("/services/courses")
public class CourseServiceController {

    @Autowired
    CourseService courseService;

    @PostMapping
    public Course save(@RequestBody Course course) {
        return courseService.save(course);
    }

    @GetMapping(value = "/{id}")
    public Course getCourse(@PathVariable int id) {

        System.out.println("request came on "+ LocalDateTime.now() + " +++++++++");
        return courseService.findById(id);
    }

    @GetMapping
    public List<Course> getAllCourses() {
        return courseService.findAll();
    }
}
