package com.titan.edufinity.assessmentservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan(basePackages = "com.titan.edufinity.model.assessment")
public class AssessmentServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(AssessmentServiceApplication.class, args);
	}

}
