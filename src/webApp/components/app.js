import React from 'react';
import Popular from './popular';
import Home from './home';
import Battle from './battle';
import Results from './results'
import {BrowserRouter as Router,Route,Link,Switch} from "react-router-dom"
import Nav from "./nav"

class App extends React.Component{
    render(){
        return (
            <Router>
        <div className="container">
            <Nav />
            <Switch>
             <Route exact path="/" component={Home} />
             <Route path="/popular" component={Popular} />      
             <Route exact path="/battle" component={Battle} />
              <Route path="/battle/results" component={Results} />
             <Route render={function(){
                return <div>Path not found</div>
             }} />
            </Switch>
        </div>
        </Router>
        );
    } 
}
module.exports = App;