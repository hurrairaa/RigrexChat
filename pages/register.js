import React ,{Component} from 'react'
import  Layout from '../components/layout'
import SimpleReactValidator from 'simple-react-validator';
import router from 'next/router'
import axios from 'axios'

class Register extends Component{
    
    constructor() {
        super()
        this.state={
            name:'',
            email:'',
            password:''
        }
        this.validator = new SimpleReactValidator({autoForceUpdate: this});
        
    }
    
    onChange=(e)=>{
        this.setState({[e.target.name]:e.target.value});
    }
    createUser=(e)=>{
        e.preventDefault()
        if (this.validator.allValid()) {
            let form=e.target;
            axios.post('/api/create-user',this.state)
                .then(response=>{
                    form.reset();
                    router.push('/login');

                })
                .catch(error=>{console.log(error)});
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
                            <h2 >Register</h2>
                        </div>  
                        <div className="card-body">
                            <form onSubmit={this.createUser} method="post">
                                <div className="form-group">
                                    <label htmlFor="name">Name:</label>
                                    <input id="name" type="text" className="form-control" name="name" placeholder="Enter Name" onChange={this.onChange}/>
                                    {this.validator.message('name', this.state.name, 'required|min:3|max:50',{className:'text-danger'})}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email:</label>
                                    <input id="email" type="text" className="form-control" name="email" onChange={this.onChange} placeholder="Enter Email"/>
                                    {this.validator.message('email', this.state.email, 'required|email', {className: 'text-danger'})}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password:</label>
                                    <input id="password" type="password" className="form-control" name="password" onChange={this.onChange} placeholder="Enter Password"/>
                                    {this.validator.message('password', this.state.password, 'required|min:3|max:50',{className:'text-danger'})}
                                </div>
                                <button className="btn btn-success">register</button>
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

export default Register;
