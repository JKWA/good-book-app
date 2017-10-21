import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { connect } from 'react-redux'
import { addBooks } from "../actions/bookActions"
import InfiniteScroll from "react-infinite-scroller"
import BookCard from "../components/Book/Card"
import BookSearch from "../components/Book/Search"
import ErrorBoundry from "../components/Error/ErrorBoundry"



const mapStateToProps = state => {

    return {
        books: state.book.searchBooks,
        query: state.book.query,
        pageStart:0,
        hasMore: state.book.hasMore,
        nextIndex: state.book.nextIndex,
        totalItems: state.book.totalItems,
    }
  }

  const styles = theme => ({
    
    container: {
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
    },
  })




 class SearchBook extends Component {

    constructor() {
        super()
        this.setLocalState = this.setState
        this._loadItems = this._loadItems.bind(this)
    }
   


    render() {
        const classes = this.props.classes
        const mappedBooks = Object.entries(this.props.books).map(book => <ErrorBoundry key={book[1].id}><div> <BookCard bookId = {book[1].id} {...book[1].volumeInfo}/> </div></ErrorBoundry>)
        const inlineStyle = {
            height:'100%', 
            overflow:'auto',
        }
        return (
           
        <div style={inlineStyle}>
            <BookSearch/>

            
            
            <InfiniteScroll
                pageStart={0}
                loadMore={this._loadItems}
                hasMore={this.props.hasMore}
                initialLoad={false}
                useWindow={false}
                threshold={500}>
                <div className={classes.container} >
                    {mappedBooks}
                </div>
            </InfiniteScroll>
        </div>
          
        )
    }
    _loadItems = (page) => {
        this.props.dispatch(addBooks(this.props.query, this.props.nextIndex))
    }
}

SearchBook.propTypes = {
     books: PropTypes.object.isRequired,
     loading: PropTypes.bool,
     query: PropTypes.string,
     pageStart: PropTypes.number,
     hasMore: PropTypes.bool,
     nextIndex: PropTypes.number,
     totalItems: PropTypes.number,
 }

export default connect(mapStateToProps)(withStyles(styles)(SearchBook))


