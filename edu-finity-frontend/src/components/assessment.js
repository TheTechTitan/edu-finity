import React, {useState, useEffect} from 'react';
import {Button} from '@material-ui/core'
import {StarHalf, WbIncandescent, AccessAlarms} from '@material-ui/icons'
//import { Link } from 'react-router-dom';
import M from 'materialize-css';

import useStyles from './styles';
import isEmpty from '../utils/is-Empty'; 
   

const Assessment = (props) => {

    const classes = useStyles();
    const [user,setUser]= useState(props.location.state.currentUser);
    const [course,setCourse]= useState(props.match.params.id);
    const [state,setState]=useState({
        questions: [],
        currentQuestion:{},
        nextQuestion:{},
        previousQuestion:{},
        answer:'',
        numberOfQuestions:0,
        numberOfAnsweredQuestions:0,
        currentQuestionIndex:0,
        score:0,
        correctAnswers:0,
        wrongAnswers:0,
        nextButtonDisabled: false,
        prevButtonDisabled: true,
        options:{}
    })

    const [time,setTime]=useState({})

    let interval =null;
 
    useEffect(()=>{
        fetch(`http://localhost:9292/services/courses/${props.match.params.id}`, {
			method: 'GET',
			headers: {'Content-Type': 'application/json'},
		})
		.then((response) => {
			return response.json();
		})
		.then((data) => {
            console.log(data, "dataa")
            setState({...state, questions: data.quizQuestionList });
		})
		.catch((err) => {
			alert(err);
		});

        //setState({...state, questions:props.location.state});
        
        displayQuestions(state.questions,state.currentQuestion,state.nextQuestion,state.previousQuestion);
        startTimer();
        console.log(state.questions, "Quesliist");
    }, []);

    useEffect(()=>{
        
        displayQuestions(state.questions,state.currentQuestion,state.nextQuestion,state.previousQuestion);

        console.log(state.questions, "2nd effect");
        console.log(props.match.params.id, "that the recieved id");
    }, [state.questions]);


    useEffect(()=>{
        
        console.log(state.questions, "calling 3rd effect now");
        displayQuestions(state.questions,state.currentQuestion,state.nextQuestion,state.previousQuestion);
        
    }, [state.score,state.correctAnswers,state.currentQuestionIndex,state.numberOfQuestions]);

    useEffect(()=>{
        
        console.log("calling new 4th effect now");
        handleDisableButton();
 
    }, [state.currentQuestion,state.nextQuestion,state.previousQuestion,state.answer,state.numberOfQuestions,state.options]);
    
    useEffect(()=>{
        
        console.log("calling new 5th effect now221");
        
    }, [time]);
    
    const displayQuestions = (questionsArg, currentQuestionArg, nextQuestionArg, previousQuestionArg) => {

        console.log(state, "state nowwww");

        if(state.nextQuestion !== undefined){
            let {currentQuestionIndex}=state;
            if(!isEmpty(state.questions)){

                console.log("insidee");

                questionsArg=state.questions;
                currentQuestionArg=questionsArg[currentQuestionIndex];
                nextQuestionArg=questionsArg[currentQuestionIndex+1];
                previousQuestionArg=questionsArg[currentQuestionIndex-1];
                const answerLocal = currentQuestionArg.answer;

                setState({
                    ...state, currentQuestion:currentQuestionArg,
                    nextQuestion:nextQuestionArg,
                    previousQuestion:previousQuestionArg,
                    answer:answerLocal,
                    numberOfQuestions: questionsArg.length,
                    options:{
                        options1:currentQuestionArg.options[0],
                        options2:currentQuestionArg.options[1],
                        options3:currentQuestionArg.options[2],
                        options4:currentQuestionArg.options[3],
                    },

                    nextButtonDisabled: false,
                    prevButtonDisabled: true
                })              
            }
        }else{
            endGame();
        }
    };

    const startTimer= () =>{
        const countDownTime= Date.now() + 180000;
        interval = setInterval(()=>{
            const now=new Date();
            const distance= countDownTime - now;

            const minutes= Math.floor((distance % (1000*60*60)) / (1000*60));
            const seconds= Math.floor((distance % (1000*60)) / 1000);

            if(distance<0){
                clearInterval(interval);         
                setTime({
                    minutes: 0,
                    seconds:0
                });
                
                endGame();

            }else{
            
                setTime({
                    minutes: minutes,
                    seconds: seconds
                });
            }

        },1000);
    }


    const handleOptionClick= (e) => {

        if(e.target.innerHTML.toLowerCase() === state.answer.toLowerCase()){
            correctOption();
        }else{
            incorrectOption();
        }
    }


    const handleNextButtonClick = () =>{
        if(state.nextQuestion !== undefined){
            setState(prevState=>({
                ...state, 
                currentQuestionIndex: prevState.currentQuestionIndex + 1
            }));
        }
    }


    const handlePreviousButtonClick = () =>{
        if(state.previousQuestion !== undefined){
            setState(prevState=>({
                ...state, 
                currentQuestionIndex: prevState.currentQuestionIndex - 1
            }));
        }
    }

    const handleQuitButtonClick = () =>{
        if(window.confirm('Are you sure you want to exit?')){
           props.history.push('/');
        }
    }

    const correctOption = () => {
        M.toast({
            html: 'Correct',
            classes: classes.toastValid,
            displayLength:1500

        });

        setState(prevState =>({
                ...state, 
                score: prevState.score +1,
                correctAnswers: prevState.correctAnswers +1,
                currentQuestionIndex: prevState.currentQuestionIndex +1,
                numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions +1
        }));

    }

    const incorrectOption = () => {
        M.toast({
            html: 'Wrong',
            classes: classes.toastInvalid,
            displayLength:1500

        });
        
        setState(prevState =>({
                ...state,
                wrongAnswers: prevState.wrongAnswers +1,
                currentQuestionIndex: prevState.currentQuestionIndex +1,
                numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions +1
        }));
    }

    const endGame= () => {
        alert('Quiz has ended!');
        const assessmentStats = {
            currentCourse:course,
            currentUser:user,
            score: state.score,
            numberOfQuestions: state.numberOfQuestions,
            numberOfAnsweredQuestions: state.numberOfAnsweredQuestions,
            correctAnswers: state.correctAnswers,
            wrongAnswers: state.wrongAnswers,    
        };

        props.history.push('/quiz/summary', assessmentStats);
    }

    const handleDisableButton = () => {
        if(state.previousQuestion !== undefined || state.currentQuestionIndex !== 0){

            console.log("prev butt diasble ");
            setState((prevState) =>({
                ...state,
                prevButtonDisabled: !prevState.prevButtonDisabled
            }));

        }  //else {

        //     setState((prevState) =>({
        //      ...state,
        //      prevButtonDisabled: prevState.prevButtonDisabled
        //     }));
        //  }

        if(state.nextQuestion === undefined || state.currentQuestionIndex + 1 === state.numberOfQuestions){
           /*  setState({
                ...state, nextButtonDisabled: true,
            }); */

            setState((prevState) =>({
                ...state,
                nextButtonDisabled: !prevState.nextButtonDisabled
            }));

        }
        // else{
        //     /* setState({
        //         ...state, nextButtonDisabled: false,
        //     }); */
        //     setState((prevState) =>({
        //         ...state,
        //         nextButtonDisabled: false
        //     }));
        // }
    }

    return(
        <>
            <div className={classes.questions}>
                <div className={classes.lifelineContainer}>
                    <p>
                        <span><StarHalf/></span>                                
                        <span className={classes.lifeline}>2</span>
                    </p>
                    <p>
                        <span><WbIncandescent/></span>
                        <span className={classes.lifeline}>5</span>
                    </p>
                </div>
                <div className={classes.timerContainer}>
                    <p>
                        <span className={classes.timerLine} >{state.currentQuestionIndex +1} of {state.numberOfQuestions}</span>
                    </p>
                    <p>    
                        <span className={classes.timerLine}> {time.minutes} : {time.seconds} <span><AccessAlarms/> </span> </span>
                    </p>
                </div>

                <h5 className={classes.AssessmentQuestion}>{state.currentQuestion.question} </h5>
                
                <div className={classes.optionsContainer}>
                    <Button onClick={(e) =>handleOptionClick(e)} id="1" className={classes.option} variant="outlined" color="primary">{state.options.options1}</Button>
                    <Button onClick={(e) =>handleOptionClick(e)} id="2" className={classes.option} variant="outlined" color="primary">{state.options.options2}</Button>
                </div>
                <div className={classes.optionsContainer}>
                    <Button onClick={(e) =>handleOptionClick(e)} id="3" className={classes.option} variant="outlined" color="primary">{state.options.options3}</Button>
                    <Button onClick={(e) =>handleOptionClick(e)} id="4" className={classes.option} variant="outlined" color="primary">{state.options.options4}</Button>  
                </div>

                <div>
                    <button onClick={() =>handlePreviousButtonClick()}>Previous</button>
                    <button onClick={() =>handleNextButtonClick()}>Next</button>
                    <button onClick={() =>handleQuitButtonClick()}>Quit</button>
                </div>
            </div>
        </>

    ); 
}
export default Assessment;