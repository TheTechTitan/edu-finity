package com.titan.edufinity.courseservice.repository;

import com.titan.edufinity.model.course.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course,Integer> {
}
