package com.titan.edufinity.assessmentservice.model;

import com.titan.edufinity.model.assessment.Assessment;

public class SimpleResponse implements Response {

    private Assessment assessment;


    public SimpleResponse(Assessment assessment) {
        this.assessment = assessment;
    }

    public Assessment getAssessment() {
        return assessment;
    }

    public void setAssessment(Assessment assessment) {
        this.assessment = assessment;
    }
}
