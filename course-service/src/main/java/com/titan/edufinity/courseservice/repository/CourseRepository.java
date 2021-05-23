package com.titan.edufinity.courseservice.repository;

import com.titan.edufinity.model.course.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;


import javax.transaction.Transactional;
import java.util.List;

public interface CourseRepository extends JpaRepository<Course,Integer> {

    @Transactional
    @Modifying
    @Query("update course u set u.courseDocument=?2 where u.cid=?1")
    void uploadDoc(int Id,byte[]  file);

    @Transactional
    @Modifying
    @Query("update course u set u.courseImage=?2 where u.cid=?1")
    void uploadImage(int id,byte[] file);
}
