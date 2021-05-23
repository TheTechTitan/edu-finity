import React, {useState, useEffect} from 'react';
import {Typography, Button, AppBar, Card, CardContent, CardMedia, CssBaseline, Paper, Grid, Toolbar, Container, CardActions} from '@material-ui/core'
import {MenuBookTwoTone} from '@material-ui/icons';
//import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentTwoToneIcon from '@material-ui/icons/AssignmentTwoTone';
import useStyles from './styles';


// Import the main component
import { Viewer } from '@react-pdf-viewer/core'; // install this library
// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Worker
import { Worker } from '@react-pdf-viewer/core'; // install this library

import {Link} from 'react-router-dom'



const Course = (props)=>{

    const classes = useStyles();
    const [course,setCourse]= useState([]);
	const [user,setUser]= useState(props.location.state);
   
    // Create new plugin instance
	const defaultLayoutPluginInstance = defaultLayoutPlugin();
	
	// for onchange event
	//const [pdfFile, setPdfFile]=useState(null);
	const [pdfFileError, setPdfFileError]=useState('');

	// for submit event
	const [viewPdf, setViewPdf]=useState(null);
    
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
			setViewPdf("data:application/pdf;base64," + data.courseDocument);
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

				<div className={classes.resourceview}>
					<Container  maxWidth="lg">
						<Paper variant="outlined" square/>
						<div className='container'>
							<br></br>
							<h4>Assessment Material</h4>
							<div className={classes.pdfContainer}>
								{/* show pdf conditionally (if we have one)  */}
								{viewPdf&&<><Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
								<Viewer fileUrl={viewPdf}
									plugins={[defaultLayoutPluginInstance]} />
								</Worker></>}

							{/* if we dont have pdf or viewPdf state is null */}
							{!viewPdf&&<>No pdf file selected</>}
							</div>
						</div>

					</Container>
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