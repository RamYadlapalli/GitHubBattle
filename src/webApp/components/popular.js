import React from 'react';
import api from '../utils/api'; 
import Loading from './loading'

//stateless functional component
function SelectedLang(props)
{
    var langs = ["All","JS","Ruby","Java","CSS","Python"];
    return (
            <div>
                <p>Selected Lang: {props.selectedLang}</p>
            <ul className="langs">
                
                {langs.map(function(lang){
                   return (
                       <li
                       style={lang===props.selectedLang?{color:"red"}:null}
                        key={lang} onClick={props.OnSelect.bind(null, lang)}>{lang}</li>
                       )
                },this)}
            </ul></div>
    )
}
function RepoGrid(props){
    console.log(props);
    return(
        <ul className="popularList">
            {props.repos.map(function(repo){
                return (
                    <li key={repo.id} className="popularItem">
                        <div className="repoCont">
                        <img className="repoBox" src={repo.owner.avatar_url}></img>
                        <div>Repository Name: {repo.name}</div>
                         <div>Watchers Count: {repo.watchers_count}</div>
                         <div>Repositiry URL:  <a href={repo.html_url}>{repo.html_url}</a> </div>
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}

class Popular extends React.Component{
    constructor(props){
        super(props);
        this.state={
            selectedLang: "All",
            repos: null
        };
        this.updateLanguage = this.updateLanguage.bind(this);
    }
    
    componentDidMount(){
      this.updateLanguage(this.state.selectedLang);
    }
    updateLanguage(lang){
        this.setState(function(){
            return {
                selectedLang : lang
            }
        });
          api.fetchPopularRepos(lang).then(function(repos){
            console.log(repos);
            this.setState(function(){
                return{
                repos: repos
                }
            })
          }.bind(this));
    }
    render(){
        
        return(
            <div><SelectedLang selectedLang={this.state.selectedLang} OnSelect={this.updateLanguage} />
            {!this.state.repos ? <Loading speed='200' />:
            <RepoGrid repos={this.state.repos}/>
            }
            </div>
        )
    }
}


module.exports = Popular;