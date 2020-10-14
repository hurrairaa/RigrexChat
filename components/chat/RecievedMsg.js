import React, { Component } from 'react';

class RecievedMsg extends Component {
    render() {
        return !this.props.messages.length>0?"":
        (this.props.messages.map(function(message,i){
            return (<div className="d-flex justify-content-start mb-4">
            <div className="img_cont_msg">
                <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img_msg" />
            </div>
            <div className="msg_cotainer">
                Hi, how are you samim?
                <span className="msg_time">8:40 AM, Today</span>
            </div>
        </div>)
        })
            
        )
    }
}

export default RecievedMsg;
