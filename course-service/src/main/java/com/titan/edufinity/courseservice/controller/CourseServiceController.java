package com.titan.edufinity.courseservice.controller;


import com.titan.edufinity.courseservice.service.CourseService;
import com.titan.edufinity.model.course.Course;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/services/courses")
//@MultipartConfig(maxFileSize = 10737418240L, maxRequestSize = 10737418240L, fileSizeThreshold = 52428800)
public class CourseServiceController {

    @Autowired
    CourseService courseService;

//    @Autowired
//    Course course;

    @PostMapping
    public Course save(@RequestBody Course course) {
        return courseService.save(course);
    }

    @GetMapping(value = "/{id}")
    public Course getCourse(@PathVariable int id, HttpServletRequest request) {

        System.out.println("request came on "+ LocalDateTime.now() + " +++++++++");

        return courseService.findById(id);
        //return courseService.findById(id).getCourseDocument();
    }

    @GetMapping
    public List<Course> getAllCourses() {
        return courseService.findAll();
    }


    @PutMapping(value = "/upload-doc")
    public void uploadDoc(@RequestParam(required = false) int id,@RequestParam("file") MultipartFile file) throws IOException {

        courseService.uploadDoc(id,file.getBytes());
    }

    @PutMapping(value = "/upload-image")
    public void uploadImage(@RequestParam(required = false) int id,@RequestParam("file") MultipartFile file) throws IOException {

        System.out.println("here controller");
        courseService.uploadImage(id,file.getBytes());
    }

   /* @GetMapping(value = "/upload-doc")
    public void getDoc(@RequestParam(required = false) int id) throws IOException {

        courseService.getDoc(id);
    }*/

//    @PostMapping("single/uploadDb")
//    FileUploadResponse singleFileUplaod(@RequestParam("file") MultipartFile file) throws IOException {
//
//        String name = StringUtils.cleanPath(file.getOriginalFilename());
//
//        course.setCourseDocument(file.getBytes());
//
//        docFileDao.save(fileDocument);
//
//        ///http://localhost:8081/download/abc.jpg
//        String url = ServletUriComponentsBuilder.fromCurrentContextPath()
//                .path("/downloadFromDB/")
//                .path(name)
//                .toUriString();
//
//        String contentType = file.getContentType();
//
//        FileUploadResponse response = new FileUploadResponse(name, contentType, url);
//
//        return response;
//
//    }
//
//    @GetMapping("/downloadFromDB/{fileName}")
//    ResponseEntity<byte[]> downLoadSingleFile(@PathVariable String fileName, HttpServletRequest request) {
//
//        FileDocument doc = docFileDao.findByFileName(fileName);
//
//        String mimeType = request.getServletContext().getMimeType(doc.getFileName());
//
//        return ResponseEntity.ok()
//                .contentType(MediaType.parseMediaType(mimeType))
////                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;fileName="+resource.getFilename())
//                .header(HttpHeaders.CONTENT_DISPOSITION, "inline;fileName=" + doc.getFileName())
//                .body(doc.getDocFile());
//    }
}
