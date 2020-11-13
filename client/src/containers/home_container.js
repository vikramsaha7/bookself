import React,{Component} from 'react'
import {connect} from 'react-redux';
import {getBooks} from '../actions';
import BookItem from '../widgetsUI/book_item';

class HomeContainer extends Component {
    
    componentWillMount(){
        this.props.dispatch(getBooks(2,0,-1));
        //-1 for decending order
    }

    renderItems=(books)=>(
        books.list ?
            books.list.map( (item,i) =>(
                <BookItem {...item} key={i}/>
            ))
        :null
    )
    
    loadmore=()=>{
        let count=this.props.books.list.length;
        this.props.dispatch(getBooks(2,count,-1,this.props.books.list))
    }  

    render(){
        console.log(this.props.books);
        return(
            <div>
               {this.renderItems(this.props.books)}
               <div
                    className="loadmore"
                    onClick={this.loadmore}

                >
                    Load More
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        books: state.books
    }
}

export default connect(mapStateToProps)(HomeContainer);