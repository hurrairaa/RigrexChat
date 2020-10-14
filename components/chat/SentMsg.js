import React, { Component } from 'react'


export default class SentMsg extends Component {
    render() {
        let auth_id=this.props.auth._id;
        return !this.props.messages?"":
        (this.props.messages.map(function(message,i){
            if(message.user_id==0){
                return (
                    <div className="chat_container" key={'chat'+i}>
                        <span>{message.msg}</span>
                    </div>
                )
            }
            else if(message.user_id==auth_id){
                return (<div className="d-flex justify-content-end mb-4" key={'sent'+i}>
                            <div className="msg_cotainer_send">
                                {message.msg}
                                <span className="msg_time_send">{message.time}</span>
                            </div>
                            <div className="img_cont_msg">
                                <img src={message.image} className="rounded-circle user_img_msg"/>
                            </div>
                        </div>)
            }else{
                return (<div className="d-flex justify-content-start mb-4" key={'recieved'+i}>
                            <div className="img_cont_msg">
                                <img src={message.image} className="rounded-circle user_img_msg" />
                            </div>
                            <div className="msg_cotainer">
                                {message.msg}
                                <span className="msg_time">{message.time}</span>
                            </div>
                        </div>)
                
            }
        })
            
        )
    }
}
