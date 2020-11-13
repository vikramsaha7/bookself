import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getUserPosts} from '../../actions';
import moment from 'moment';
import {Link} from 'react-router-dom';

class userPosts extends Component {
   
    componentWillMount(){
        this.props.dispatch(getUserPosts(this.props.user.login.id));
    }

    showUserPosts=(user)=>(
        user.userPosts?
            user.userPosts.map(item=>(
                <tr key={item._id}>
                    <td><Link to={`/user/edit-post/${item._id}`}>{item.name}</Link></td>
                    <td>{item.author}</td>
                    <td>{moment(item.createAt).format('MM/DD/YY')}</td>
                </tr>
            ))
        :null
    )

    render() {
        let user=this.props.user;
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Author</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.showUserPosts(user)}
                    </tbody>
                </table>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        user:state.user
    }
}

export default connect(mapStateToProps)(userPosts);
