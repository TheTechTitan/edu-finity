import React, {useState, useEffect} from 'react';
import {Typography, Button, AppBar, Card, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Container, CardActions} from '@material-ui/core'
import {MenuBookTwoTone} from '@material-ui/icons';
import useStyles from './styles';



const Home = () =>{

    const classes = useStyles();
    const [cards,setCards]= useState([]);
    //const [testCards,setTestCards]= useState([1,2,3,4,5]);
    
    useEffect(()=>{
        fetch('http://localhost:9292/services/courses', {
			method: 'GET',
			headers: {'Content-Type': 'application/json'},
		})
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			setCards(data);
		})
		.catch((err) => {
			alert(err);
		});
    }, []);


    return(
        <>
            {console.log("here again")}
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
                    <Container maxWidth="sm">
                        <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
                            We are here now
                        </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            Choose your favourite course for free
                        </Typography>
                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                    <Grid container spacing={4}>

                        {cards.map((card)=>(
                            <Grid item key={card.cid} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardMedia 
                                        className={classes.cardMedia} 
                                        image="https://source.unsplash.com/random"
                                        title="Image titles"
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h4">
                                            {card.courseName}
                                        </Typography>
                                        <Typography gutterBottom variant="h6">
                                            Domain: {card.domain}
                                        </Typography>
                                        <Typography gutterBottom variant="h6">
                                            Type: {card.type}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" color="secondary">Attempt</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
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

export default Home;