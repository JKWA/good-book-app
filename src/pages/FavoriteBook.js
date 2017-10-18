import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import BookCard from "../components/Book/Card"
import ErrorBoundry from "../components/Error/ErrorBoundry"
import { setRoute } from '../actions/layoutActions'

const mapStateToProps = state => {

    return {
        books: state.user.favoriteBooks,
    }
  }

  const styles = theme => ({
 
    container: {
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
    },
  
  })


 class FavoriteBook extends Component {

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

            <Typography type="headline">
                My Favorite Books
            </Typography>

            {(mappedBooks.length === 0) && 

            <Link to="/search" onClick={this._setRoute}>
                <Typography type="body1">
                    First, you will need to find a book.
                </Typography>
            </Link>
            
            }
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

FavoriteBook.propTypes = {
    classes: PropTypes.object.isRequired,
    books: PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(withStyles(styles)(FavoriteBook))

