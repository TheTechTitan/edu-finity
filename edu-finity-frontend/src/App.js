import React from 'react';
import SignIn from './components/signIn';
import SignUp from './components/signUp';
import Home from './components/home';
import Course from './components/course';

import {BrowserRouter, Switch, Route} from 'react-router-dom'


const App = () =>{

    return(
        <BrowserRouter>
            <div className="App">
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/signin" component={SignIn}/>
                    <Route path="/signup" component={SignUp}/>
                    <Route path="/course" component={Course}/>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;