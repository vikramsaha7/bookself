import { connect } from 'react-redux'
import React, { Component } from 'react'
import {loginUser} from '../../actions';
//ahram@gmail.com --pass--nothing
class Login extends Component {

    state={
        email:'',
        password:'',
        error:'',
        success:false
    }
    handleInputEmail=(event)=>{
        this.setState({email:event.target.value})
    }

    handleInputPassword=(event)=>{
        this.setState({password:event.target.value})
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps);
        
        if(nextProps.user.isAuth){
            this.props.history.push('/user');
        }
    }

    submitForm=(e)=>{
        e.preventDefault();
        //console.log(this.state)
        this.props.dispatch(loginUser(this.state));
    }

    render() {
        //console.log(this.props.user);
        let user=this.props.user;
        return (
            <div className="rl_container">
                <form onSubmit={this.submitForm}>
                    <h2>Log in here</h2>
                    <div className="form_element">
                        <input
                            type="email"
                            placeholder="Enter your mail"
                            value={this.state.email}
                            onChange={this.handleInputEmail}
                        />     
                    </div>

                    <div className="form_element">
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={this.state.password}
                            onChange={this.handleInputPassword}
                        />     
                    </div>

                    <button type="submit">Login</button>
                    <div className="error">
                    {
                        user?
                            <div>{user.message}</div>
                        :null
                    }
                    </div>

                </form>
            </div>
        )
    } 
}

function mapStateToProps(state){
    return{
        user:state.user.user
    }
}

export default connect(mapStateToProps)(Login)