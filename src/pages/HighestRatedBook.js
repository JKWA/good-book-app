import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import BookCard from "../components/Book/Card"
import ErrorBoundry from "../components/Error/ErrorBoundry"
import { setRoute } from '../actions/layoutActions'
import FavoriteBookData from '../components/Data/FavoriteBookData'

const mapStateToProps = state => {

    return {
        books: state.book.highestRatedBooks,
    }
  }

  const styles = theme => ({
 
    container: {
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
    },
  
  })


 class HighestRatedBook extends Component {

    constructor(props) {
        super(props)
        this.setLocalState = this.setState
        this._setRoute = this._setRoute.bind(this)
        
    }
   
    render() {
        
        const classes = this.props.classes
        const mappedBooks = Object.entries(this.props.books)
                            .sort((a,b) => {return (a[1].title > b[1].title) ? 1 : ((b[1].title > a[1].title) ? -1 : 0)} )
                            .map(book => <div key={book[0]}><ErrorBoundry><BookCard bookId = {book[1].bookId} {...book[1]}/></ErrorBoundry></div>)                

        return (

        <div>
            <FavoriteBookData />

            <Typography type="headline">
                Highest Rated Books
            </Typography>

           
            <div className={classes.container}>
                {mappedBooks}
            </div>
        </div>
          
        )
    }
    _setRoute = (event) =>{
        this.props.dispatch(setRoute('search'))
      }
}

HighestRatedBook.propTypes = {
    classes: PropTypes.object.isRequired,
    books: PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(withStyles(styles)(HighestRatedBook))

