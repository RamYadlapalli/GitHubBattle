import React from 'react';
import {Link} from 'react-router-dom'; 

class Home extends React.Component{
    render(){
        return(
            <div className="home-container">
              <h1>  <Link className="button" to="/battle">Github Battle</Link></h1>
                </div>
        )
    }
}

module.exports = Home;