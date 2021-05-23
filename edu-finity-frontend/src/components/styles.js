import {makeStyles} from '@material-ui/core/styles'


const useStyles = makeStyles ((theme)=>({
    container: {
        backgroundColor : theme.palette.background.paper,
        //padding: theme.spacing(0, 0, 0)
    },
    icon : {
        marginRight: '20px',
    },
    pdfContainer:{
        width: '100%',
        height: '800px',
        backgroundColor: '#e4e4e4',
        overflowY: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardGrid:{
        padding: '20px 0'
    },
    card:{
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    cardMedia:{
        paddingTop: '56.25%'
    },
    cardContent:{  
        flexGrow: 1
    },
    footer:{
        backgroundColor: theme.palette.background.paper,
        padding: '50px 0',
    },
    resourceview:{
        //backgroundColor : theme.palette.background.paper,
        height: '100%',
        padding: '20px 0'
    },
    attempAssessmentButton:{
        padding: '25px 0px'
    },
    questions:{
        backgroundColor: '#FAF9F6',
        borderLeft: '5px solid #6495ed',
        width: '80%',
        margin: '3rem auto 0 auto',
        padding: '1.5rem 2rem'
    },
    lifelineContainer:{
        display: 'flex',
        justifyContent: 'space-between',
        margin: '2rem auto 2rem auto',
    },
    lifeline:{
        position: 'relative',
        top: '-3px',
    },
    timerContainer:{
        display: 'flex',
        justifyContent: 'space-between',
    },
    timerLine:{
        position: 'relative',
        top: '-3px',
    },
    AssessmentQuestion:{
        fontSize: '1.4rem',
        marginBottom: '3rem',
        lineHeight: '1.5',
        textAlign: 'center'
    },
    optionsContainer:{
        display: 'inline-block',
        width: '50%',
    },
    option: {
        //backgroundColor: '#6495ed',
        borderRadius: '30px',
        //color: '#6495ed',
        //cursor: 'pointer',
        margin: '1rem auto',
        padding: '10px',
        transition: '0.3s linear all',
        textAlign: 'center',
        width: '95%'
    },
    toastValid:{
        backgroundColor: '#00ff40 !important',
        borderRadius: '5px !important',
        height: '50%',
        width: '20%',
        fontSize: '20px'
    },
    toastInvalid:{
        backgroundColor: '#ff0040 !important',
        borderRadius: '5px !important',
        height: '50%',
        width: '20%',
        fontSize: '20px'
    },
    summaryContainer:{
        justifyContent: 'space-between',
        margin: '2rem auto 2rem auto',
        textAlign: 'center',
        backgroundColor : theme.palette.background.paper,
        backgroundColor: '#FAF9F6',
        borderLeft: '5px solid #6495ed',
        width: '45%',
        //margin: '3rem auto 0 auto',
        padding: '1.5rem 2rem' 
    },
    summaryLabel:{
       display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        textAlign: 'center',
        fontSize: '25px',
        marginTop: '10px'
    },
    summaryValue:{
        
    }


}));

export default useStyles;