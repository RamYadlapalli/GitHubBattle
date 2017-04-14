import axios from 'axios';

var id = "3670603169ea9f6f70ab";
var secret = "1f18568ef1e7639fbf7f53acc0eedb388442a186";
var params = "?client_id=" + id+"&client_secret="+secret;
module.exports ={
    fetchPopularRepos: function(language){
        var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+language +'&sort=stars&order=desc&type=Repositories');
        return axios.get(encodedURI).then(function(response){
            return response.data.items;
        })
    },
    battle: function(players){
        return axios.all(players.map(getUserData)).then(axios.spread(function (data,data1){          
           return sortPlayers([data,data1]);

        })).catch(handleError);
    },
    
}
function handleError(error){
    console.log(error);
}

function getProfile(username){
        return axios.get('https://api.github.com/users/'+username+params).then(function(user){
            return user.data;
        })
    }
   function getRepos(username){
        return axios.get('https://api.github.com/users/'+username+'/repos'+params+'&per_page=100').then(function(data){return data.data;});
    }
   function getStarCount(repos){
        return repos.reduce(function(count,repo){
            return count+repo.stargazers_count;
        },0);
    }
    function calculateScore(profile,repos){
        var followers = profile.followers;
        var totalStars = getStarCount(repos);
        return (followers*3) + totalStars;
    }
   function getUserData(player){
      return  axios.all([getProfile(player),getRepos(player)]).then(axios.spread(function (profile, repos) {
    // Both requests are now complete
           
            return{
                profile:profile,
                score:calculateScore(profile,repos)
            }
        }))
    }
 function sortPlayers(players){
        return players.sort(function(a,b){
            return b.score-a.score;
        })
    }
