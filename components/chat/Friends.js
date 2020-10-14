import React, { Component } from 'react'

export default class Friends extends Component {
    render() {

        return (!this.props.friends)?"":( this.props.friends.map(function(friend,i){
            return <li key={i}>
                <div className="d-flex bd-highlight" >
                    <div className="img_cont">
                        <img src={friend.image} className="rounded-circle user_img" />
                        <span className="online_icon offline"></span>
                    </div>
                    <div className="user_info">
                        <span>{friend.name}</span>
                        <p>Taherah left 7 mins ago</p>
                    </div>
                </div>
            </li>  
        }))
            
        
    }
}
