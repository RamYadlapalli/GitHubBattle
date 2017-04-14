import React from 'react';
import { parse } from 'query-string';
import api from '../utils/api'; 
import PlayerPreview from './playerPreview';
import Loading from './loading'

function Player(props){
    return(
        <div className="playerResult">
          {props.result =='winner' &&
            <h3>Winner</h3>
          }
          {props.result =='loser' &&
            <h3>Loser</h3>
          }
            <h3>Score:{props.score}</h3>
            <PlayerPreview avatar={props.avatar} username={props.label} />
           
            </div>
    )
}

class Results extends React.Component{
    constructor(props){
        super(props);
        this.state={
            winner:null,
            loser:null
        }
    }
componentDidMount (){
      var players = parse(this.props.location.search);
      api.battle([players.playerOneName,players.playerTwoName]).then(function(data){
         console.log(data);
          this.setState(function(){
              return {
                  winner:data[0],
                  loser:data[1]
              }
          });
      }.bind(this));
}
render(){
  var winner = this.state.winner;
  if(winner==null)
  {
      return <Loading />
  }
  else{
    return(
    <div>
    <div>Results</div>
        <Player label={this.state.winner.profile.name} score={this.state.winner.score} avatar={this.state.winner.profile.avatar_url} result='winner'/>
  

    <Player label={this.state.loser.profile.name} score={this.state.loser.score} avatar={this.state.loser.profile.avatar_url} result='loser'/>
      </div>
    )
    }
}
}
module.exports = Results;