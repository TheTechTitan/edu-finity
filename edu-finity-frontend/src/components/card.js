import React from 'react';

const Card = (props)=>{

    return(
        <Card className={classes.card}>
            <CardMedia 
                className={classes.cardMedia} 
                image="https://source.unsplash.com/random"
                title="Image titles"
            />
            <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5">
                    Heading
                </Typography>
                <Typography gutterBottom variant="h5">
                    This is a media card to describe course
                </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color="secondary">Attempt</Button>
                </CardActions>                        
        </Card>
    );
}

export default Card;