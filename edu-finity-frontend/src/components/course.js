import React, {useState, useEffect} from 'react';
import {Typography, Button, AppBar, Card, CardContent, CardMedia, CssBaseline, Paper, Grid, Toolbar, Container, CardActions} from '@material-ui/core'
import {MenuBookTwoTone} from '@material-ui/icons';
//import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentTwoToneIcon from '@material-ui/icons/AssignmentTwoTone';
import useStyles from './styles';

import {Link} from 'react-router-dom'



const Course = (props)=>{

    const classes = useStyles();
    const [course,setCourse]= useState([]);
	const [user,setUser]= useState(props.location.state);
   
    
    
    useEffect(()=>{
        fetch(`http://localhost:9292/services/courses/${props.match.params.id}`, {
			method: 'GET',
			headers: {'Content-Type': 'application/json'},
		})
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			setCourse(data);
		})
		.catch((err) => {
			alert(err);
		});
        console.log(props.location.state, "user on course") ;
    }, []);


	const handleAttemptAssessment = () =>{

		//console.log(props);
		props.history.push(`/assessment/${props.match.params.id}`, {quizQuestionList: course.quizQuestionList, currentUser:user} );
	}

    return(
		<>
			<CssBaseline />
			<AppBar position="relative">
				<Toolbar >
					<MenuBookTwoTone fontSize ="large" className={classes.icon}/>
					<Typography variant="h4">
						Edu-Finity 
					</Typography>
				</Toolbar>
			</AppBar>
			<main>
				<div className={classes.container}>
					<Container maxWidth="sm" >
						<Typography variant="h2" align="center" color="textPrimary" gutterBottom>
							{course.courseName}
						</Typography>
						<Typography variant="h5" align="center" color="textSecondary" paragraph>
							Choose your favourite course for free
						</Typography>
					</Container>
				</div>
				<div className={classes.resourceview}>
					<Container  maxWidth="lg">
						<Paper variant="outlined" square/>
					</Container>
				</div>	

				<div className={classes.attempAssessmentButton}>
					<Typography variant="h6" align="center" gutterBottom>
							<Button variant="outlined" color="secondary" onClick={() =>handleAttemptAssessment()}>
								<AssignmentTwoToneIcon fontSize ="large" className={classes.icon}/>
								ATTEMPT ASSESSMENT
							</Button>
					</Typography>
				</div>
			</main>

			<footer className={classes.footer}>
				<Typography variant="h6" align="center" gutterBottom>
					Footer
				</Typography>
				<Typography variant="subtitle1" align="center" color="primary">
					Type here anything for the footer
				</Typography>
			</footer>
		</>
    );
}

export default Course;