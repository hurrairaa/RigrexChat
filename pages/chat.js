import React, { Component } from 'react'
import  Layout from '../components/layout'
import axios from 'axios'
import io from 'socket.io-client'
import Friends from '../components/chat/Friends'
import SentMsg from '../components/chat/SentMsg'
import moment from 'moment'

class Users extends Component {
    constructor(){
        super();
        this.msgConRef=React.createRef();
        this.socket =io();

        this.socket.on('message',data=>{
            this.setState({['sendMsg']:this.state.sentMsgs.push({msg:data,user_id:0})});
                        
            this.socket.emit('joined',this.props.auth);
        })
        this.socket.on('joined',(data)=>{
            this.setState({['sendMsg']:this.state.sentMsgs.push({msg:data,user_id:0})});
        })
        this.socket.on('chatMessage',msg=>{
            this.setState({['sendMsg']:this.state.sentMsgs.push(msg)});
        })

    }
    state={
        users:[],
        sentMsgs:[],
    }
    componentWillUnmount(){
       
    }
    componentDidMount() {
        this.fetchChats();
    }
    makeMessage=(msg)=>{
        let element={
            name:this.props.auth.name,
            image:this.props.auth.image,
            msg:msg,
            user_id:this.props.auth._id,
            time:moment().format("h:mm a")
        };
        return element;
    }
    broadCastMessage=(msg)=>{
        this.socket.emit('chatMessage',this.makeMessage(msg));
    }
    sendMsg=(e)=>{
        e.preventDefault()
        let element=this.makeMessage(e.target.elements[0].value)
        this.setState({sendMsg:this.state.sentMsgs.push(element)});
        
        this.broadCastMessage(e.target.elements[0].value);
        
        e.target.elements[0].value="";

        this.msgConRef.current.scrollTop=this.msgConRef.current.scrollHeight+1000;
        e.target.elements[0].focus()
    }
    static async getInitialProps(ctx){
        try{
            axios.defaults.headers=ctx.req?.headers;
            const authResponse= await axios.post('http://127.0.0.1:3000/api/auth-user');
            const auth=authResponse.data.data
            
            const userResponse= await axios.get('http://127.0.0.1:3000/api/fetch-user')
            const users=userResponse.data

            return {users:users,auth:auth}
        }catch(error){
            return {user:[],auth:[]}
        }

    }
    fetchChats=()=>{
        axios.post('/api/fetch-chat')
            .then(response=>{

                // this.setState({auth:response.data.data})
                this.setState({sentMsgs:response.data.chats})
                
                console.log(this.state.sentMsgs);
            })
            .catch(error=>{console.log(error)});
    }
    render() {

        return (
            <Layout>
                <div className="container-fluid h-100">
                    <div className="row justify-content-center h-100">
                        <div className="col-md-4 col-xl-3 chat">
                            <div className="card mb-sm-3 mb-md-0 contacts_card">
                                <div className="card-header">
                                    <div className="input-group">
                                        <input type="text" placeholder="Search..." name="" className="form-control search"/>
                                        <div className="input-group-prepend">
                                            <span className="input-group-text search_btn"><i className="fas fa-search"></i></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body contacts_body">
                                    <ul className="contacts">
                                        <Friends friends={this.props.users}/>
                                    </ul>
                                </div>
                                <div className="card-footer"></div>
                            </div>
                        </div>
                        <div className="col-md-8 col-xl-6 chat">
                            <div className="card">
                                <div className="card-header msg_head">
                                    <div className="d-flex bd-highlight">
                                        <div className="img_cont">
                                            <img src={this.props.auth.image} className="rounded-circle user_img" />
                                            <span className="online_icon"></span>
                                        </div>
                                        <div className="user_info">
                                            <span>{this.props.auth.name}</span>
                                            <p>1767 Messages</p>
                                        </div>
                                        <div className="video_cam">
                                            <span><i className="fas fa-video"></i></span>
                                            <span><i className="fas fa-phone"></i></span>
                                        </div>
                                    </div>
                                    <span id="action_menu_btn"><i className="fas fa-ellipsis-v"></i></span>
                                    <div className="action_menu">
                                        <ul>
                                            <li><i className="fas fa-user-circle"></i> View profile</li>
                                            <li><i className="fas fa-users"></i> Add to close friends</li>
                                            <li><i className="fas fa-plus"></i> Add to group</li>
                                            <li><i className="fas fa-ban"></i> Block</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="card-body msg_card_body" ref={this.msgConRef}>
                                    <SentMsg messages={this.state.sentMsgs} auth={this.props.auth}/>
                                </div>
                                <div className="card-footer">
                                    <form onSubmit={this.sendMsg}>
                                        <div className="input-group">
                                            <div className="input-group-append">
                                                <span className="input-group-text attach_btn"><i className="fas fa-paperclip"></i></span>
                                            </div>
                                            <textarea name="msg" className="form-control type_msg" placeholder="Type your message..."></textarea>
                                            <button className="input-group-append input-group-text send_btn" >
                                                <span><i className="fas fa-location-arrow"></i></span>
                                            </button>
                                        </div>  
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}

export default Users;

