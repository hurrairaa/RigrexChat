import React ,{Component} from 'react'
import  Layout from '../components/layout'
import SimpleReactValidator from 'simple-react-validator';
import { useRouter } from 'next/router'
import axios from 'axios'
import router from 'next/router'


class Login extends Component{

    constructor(){
        super()
        this.state={
            email:'',
            password:''
        }
        this.validator=new SimpleReactValidator({autoForceUpdate:this})

    }
    onChange=(e)=>{
        this.setState({[e.target.name]:e.target.value});
    }
  
    
    loginUser=(e)=>{
        e.preventDefault();
        let form =e.target;
        if(this.validator.allValid()){
            axios.post('/api/login-user',this.state)
            .then(response=>{
                // localStorage.setItem('access_token',response.data.data);
                form.reset();
                this.state={
                    email:'',
                    password:''
                }
                router.push('/chat');
            }).catch(error=>{console.log(error)});
        }else{
            this.validator.showMessages();
        }
    }
    render(){
        return (
            <Layout>
                <div className="container center">

                    <div className="p-2 m-5 card card-size">
                        <div className="card-header">
                            <h2 className="card-head">Login</h2>
                        </div>  
                        <div className="card-body">
                            <form onSubmit={this.loginUser}>
                                <div className="form-group">
                                    <label htmlFor="email">Email:</label>
                                    <input id="email" type="text" className="form-control" name="email" onChange={this.onChange} placeholder="Enter Email"/>
                                    {this.validator.message('email',this.state.email,'required|email',{className:'text-danger'})}
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="password">Password:</label>
                                    <input type="password" id="password" className="form-control" name="password" onChange={this.onChange} placeholder="Enter Password"/>
                                    {this.validator.message('password',this.state.password,'required',{className:'text-danger'})}
                                </div>
                                <button className="btn btn-success">login</button>
                            </form>
                        </div>
                    </div> 
                    <style jsx>{`
                        .center{
                            display:flex;
                            justify-content:center;
                            align-items:center;
                            flex-direction:column;
                        }
                        .card-size{
                            width:50%;
                        }
                        @media(max-width:760px){
                            .card-size{
                                width:90%;
                            }   
                        }
                    `}</style>
                </div>
            </Layout>
        );
    }
}

export default Login;