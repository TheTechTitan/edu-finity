import React from 'react';
import SignIn from './components/signIn';
import SignUp from './components/signUp';
import Home from './components/home';
import Course from './components/course';
import Assessment from './components/assessment';
import AssessmentSummary from './components/AssessmentSummary';

import {BrowserRouter, Switch, Route} from 'react-router-dom'


const App = () =>{

    return(
        <BrowserRouter>
            <div className="App">
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/course/:id" exact component={Course}/>
                    <Route path="/signin" component={SignIn}/>
                    <Route path="/signup" component={SignUp}/>
                    <Route path="/assessment/:id" exact component={Assessment}/>
                    <Route path="/quiz/summary" exact component={AssessmentSummary} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;