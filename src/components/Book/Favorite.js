import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import FavoriteIcon from 'material-ui-icons/Favorite'
import IconButton from 'material-ui/IconButton'
import {saveFavoriteStatus} from '../../actions/userActions'
import Typography from 'material-ui/Typography'

  const mapStateToProps = state => {
    
    return {
       uid: state.user.uid,
       userBook: state.user.book,
    }
  }

  const styles = theme => ({


    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginLeft: theme.spacing.unit,
    },

    rating: {
      margin: 'auto 0',
    },

    favoriteSaved: {
      color:theme.palette.secondary[500]
    },

    favoriteSaving: {
      color:theme.palette.secondary[200]
    },
   
    error: {
        color:'red',
    },
 
  });
  
class Favorite extends Component {

    constructor(props) {
        super(props)
        this._toggleFavorite = this._toggleFavorite.bind(this)
        this.state = {error:null};
        this.setLocalState = this.setState
      }



    render() {
        const classes = this.props.classes;
        const book = (this.props.userBook[this.props.bookId]) ? this.props.userBook[this.props.bookId] : {}
        const favorite = (book.favorite) ? true : false
        const saved = (book.saved) ? true : false
        
        const favoriteClass = (!favorite) ? null :
                (saved) ? classes.favoriteSaved : classes.favoriteSaving
        const rating = (this.props.rating) ? this.props.rating : null
        return (
            <div className={classes.container}>
              <IconButton label="test" className={favoriteClass} onClick={this._toggleFavorite} aria-label="Add book to favorites">
                 <FavoriteIcon />
              </IconButton>
              {rating &&
                <Typography type="caption" className={classes.rating}>
                  ({rating})
                </Typography>
              }
            </div>
        )
    }

    _toggleFavorite = (event) => {
      const book = (this.props.userBook[this.props.bookId]) ? this.props.userBook[this.props.bookId] : {}
      const favorite = (book.favorite) ? !book.favorite : true
      const like = (book.like) ? book.like : false
   
      this.props.dispatch(
        saveFavoriteStatus(
          this.props.bookId, 
          this.props.uid,
          favorite,
          (favorite) ? 'yes' : like,
        ))
    }

}

Favorite.propTypes = {
  classes: PropTypes.object.isRequired,
  uid: PropTypes.string,
  userBook: PropTypes.object.isRequired,
  bookId: PropTypes.string.isRequired, 
  rating: PropTypes.number,   
}
  

export default connect(mapStateToProps)(withStyles(styles)(Favorite))