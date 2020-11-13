import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getUsers,userRegister } from '../../actions'


class Register extends Component {

    state = {
        name:'',
        lastname:'',
        email:'',
        password:'',
        error:''
    }

    componentWillMount(){
        this.props.dispatch(getUsers());
    }

    handleInputEmail=(e)=>{
        this.setState({email:e.target.value})
    }

    handleInputPassword=(e)=>{
        this.setState({password:e.target.value})
    }

    handleInputName=(e)=>{
        this.setState({name:e.target.value})
    }

    handleInputLastname=(e)=>{
        this.setState({lastname:e.target.value})
    }

    submitForm = (e) =>{
        e.preventDefault();
        this.setState({error:''});
        this.props.dispatch(userRegister({
            name: this.state.name,
            lastname: this.state.lastname,
            email: this.state.email,
            password: this.state.password
        },this.props.user.users))
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps);
        if(nextProps.user.register === false){
            this.setState({error:'Error, try again'})
        } else {
            this.setState({
                name:'',
                lastname:'',
                email:'',
                password:''
            })
        }     
    }

    showUsers=(user)=>(
        user.users ?
            user.users.map(item=>(
                <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.lastname}</td>
                    <td>{item.email}</td>
                </tr>
            ))
        :null
    )

    render() {
        let user=this.props.user;
        return (
            <div className="rl_container">
                <form onSubmit={this.submitForm}>
                    <h2>Add User</h2>

                    <div className="form_element">
                        <input 
                            type="text"
                            placeholder="Enter name"
                            value={this.state.name}
                            onChange={this.handleInputName}
                        />
                    </div>
                    <div className="form_element">
                        <input 
                            type="text"
                            placeholder="Enter Lastname"
                            value={this.state.lastname}
                            onChange={this.handleInputLastname}
                        />
                    </div>
                    <div className="form_element">
                        <input 
                            type="email"
                            placeholder="Enter Email"
                            value={this.state.email}
                            onChange={this.handleInputEmail}
                        />
                    </div>

                    <div className="form_element">
                        <input 
                            type="password"
                            placeholder="Enter Password"
                            value={this.state.password}
                            onChange={this.handleInputPassword}
                        />
                    </div>
                    <button type="submit">Add user</button>
                    <div className="error">
                        {this.state.error}
                    </div>

                </form>
                <div className="current_users">
                    <h4>Current Users</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Lastname</th>
                                <th>Email</th>
                            </tr>  
                        </thead>
                        <tbody>
                            {this.showUsers(user)}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        user:state.user
    }
}

export default connect(mapStateToProps)(Register);