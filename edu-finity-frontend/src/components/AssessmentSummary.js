import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import useStyles from './styles';

const AssessmentSummary =(props) => {

    const classes = useStyles();
    const [state,setState]=useState({
        course:'',
        user: '',
        score: 0,
        numberOfQuestions: 0,
        numberOfAnsweredQuestions: 0,
        correctAnswers: 0,
        wrongAnswers: 0
    })

    useEffect(()=>{
        const { currentCourse,currentUser, score, numberOfQuestions, numberOfAnsweredQuestions, correctAnswers, wrongAnswers } = props.location.state;

        let datenow= "2021-02-13T17:09:42.411"
        const assessmentSummary={
            "userId": currentUser,
            "courseId": currentCourse,
            "score": (score/numberOfQuestions) * 100,
            "attemptedDate": ""
            //find how to convert date
        }

        console.log(assessmentSummary, "persitence data");
        console.log(Date.parse(Date.now()), "loc date");
       


        fetch(`http://localhost:9393/services/assessments/`, {
			method: 'POST',
            body : JSON.stringify(assessmentSummary),
			headers: {'Content-Type': 'application/json'},
		})
		.then((response) => {
			return response.json();
		})
		.then((data) => {
            console.log(data, "dataa in summary after post")
            //setState({...state, questions: data.quizQuestionList });
		})
		.catch((err) => {
			alert(err);
		});

        setState({
            course: currentCourse,
            user: currentUser,
            score: (score/numberOfQuestions) * 100,
            numberOfQuestions: numberOfQuestions,
            numberOfAnsweredQuestions: numberOfAnsweredQuestions,
            correctAnswers: correctAnswers,
            wrongAnswers: wrongAnswers
        });
        
    },[])

    console.log(state);

    const content = ()=> {

        let statistics, grading;

        if(state.score>=90){
            grading= 'A+';
        }else if(state.score>=80){
            grading= 'A';
        }else if(state.score>=75){
            grading= 'A-';
        }else if(state.score>=70){
            grading= 'B+';
        }else if(state.score>=65){
            grading= 'B';
        }else if(state.score>=55){
            grading= 'B-';
        }else if(state.score>=50){
            grading= 'C+';
        }else if(state.score>=45){
            grading= 'C';
        }else{
            grading= 'Fail';
        }

        if(state !== undefined){
            statistics= (
               <>
                    <div>
                        <span className="vv">

                        </span>
                    </div>
                    <h1>Quiz has ended</h1>
                    <div className={classes.summaryContainer}>
                        <h1>{grading}</h1>
                        <h2>Your Score: {state.score.toFixed(0)}&#37;</h2>
                        <span className={classes.summaryLabel}>
                            <span >Total Number of questions</span>
                            <span className={classes.summaryValue}>{state.numberOfQuestions}</span>
                        </span> <br />

                        <span className={classes.summaryLabel}>
                            <span className={classes.summaryLabel}>Number of questions attempted</span>
                            <span className={classes.summaryValue}>{state.numberOfAnsweredQuestions}</span>
                        </span> <br />

                        <span className={classes.summaryLabel}>
                            <span className={classes.summaryLabel}>Number of correct answers</span>
                            <span className={classes.summaryValue}>{state.correctAnswers}</span>
                        </span> <br />

                        <span className={classes.summaryLabel}>
                            <span className={classes.summaryLabel}>Number of wrongs answers</span>
                            <span className={classes.summaryValue}>{state.wrongAnswers}</span>
                        </span> <br />        
                    </div>
                    <section>
                        <ul>
                            <li>
                                <Link to="/">Back to Home</Link> 
                            </li>
                            <li>
                                <Link to="/play/quiz">Attempt Again</Link> 
                            </li>
                        </ul>
                    </section>
               </>
            );
        }else{
            statistics=(
                <>
                    <h1 className="noSummary">Sorry some went wrong</h1>
                    <ul>
                        <li>
                            <Link to="/">Back to Home</Link> 
                        </li>
                        <li>
                            <Link to="/play/quiz">Attempt Again</Link> 
                        </li>
                    </ul>
                </>
            );
        }

        return statistics;
    }

    return(
        
        <>
            {content()}
        </> 
    );
}
export default AssessmentSummary;