import React from 'react';


function PlayerPreview(props){
    return(
        <div>
            <div>
                <img className='avatar' src={props.avatar}/>
                <h2>{props.username}</h2>
                </div>
               {props.children}
                </div>
    )
}
module.exports = PlayerPreview;