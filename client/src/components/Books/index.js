import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getBookReviewer,clearBookReviewer} from '../../actions';

class BookView extends Component {
    
    componentWillMount(){
        this.props.dispatch(getBookReviewer(this.props.match.params.id)) 
    }

    componentWillUnmount(){
        this.props.dispatch(clearBookReviewer())
    }
    
    renderBook =(books) =>(
        books.book?
            <div className="br_container">
                <div className="br_header">
                    <h2>{books.book.name}</h2>
                    <h5>{books.book.author}</h5>
                    <div className="br_reviewer">
                        <span>Reviewed by:</span>{books.reviewer.name} {books.reviewer.lastname}
                    </div>
                </div>
                <div className="br_review">
                    {books.book.review}
                </div>
                <div className="br_box">
                    <div className="left">
                        <div>
                            <span>Pages:</span>{books.book.pages}
                        </div>
                        <div>
                            <span>Price:</span>{books.book.price}
                        </div>
                    </div>
                    <div className="right">
                        <span>Rating</span>
                        <div>{books.book.rating}</div>
                    </div>
                </div>
            </div>
        :null
    )

    render() {
        let books=this.props.books;
        return (
            <div>
                {this.renderBook(books)}              
            </div>
        )
    }
}

function mapDispatchToProps(state){
    return{
        books:state.books
    }
}

export default connect(mapDispatchToProps)(BookView)
