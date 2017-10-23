import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import IconButton from 'material-ui/IconButton'
import { saveFavoriteStatus } from '../../actions/userActions'
import ThumbUp from 'material-ui-icons/ThumbUp'
import ThumbDown from 'material-ui-icons/ThumbDown'
import red from 'material-ui/colors/red';
import green from 'material-ui/colors/green';
import Typography from 'material-ui/Typography'
import grey from 'material-ui/colors/grey';


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
      margin: 'auto 5px',
      padding: '0 10px',
      borderRight:'solid',
      borderWidth: '1px',
      borderColor: grey[400],
      display:'flex',
      flexDirection: 'column',
    },

    likeSaved: {
      color:green[600]
    },

    likeSaving: {
      color:green[200]
    },

    notLikeSaved: {
      color:red[300]
    },

    notLikeSaving: {
      color:red[700]
    },
   
    error: {
        color:red[500],
    },
 
  });
  
class Like extends Component {

    constructor(props) {
        super(props)
        this._saveLike = this._saveLike.bind(this)
        this._saveNotLike = this._saveNotLike.bind(this)
        this.state = {error:null};
        this.setLocalState = this.setState
      }

    render() {
        const classes = this.props.classes;
        const book = (this.props.userBook[this.props.bookId]) ? this.props.userBook[this.props.bookId] : {}
        
        let like = (book.like) ? book.like : false
        const rating = (this.props.rating) ? Math.round(this.props.rating*100) : null 
        const saved = (book.saved) ? true : false
        
        let likeClass = (like === 'yes') ? (saved) ? classes.likeSaved : classes.likeSaving : null
        let notLikeClass = (like === 'no') ? (saved) ? classes.notLikeSaved : classes.notLikeSaving : null
      
        return (
            <div className={classes.container}>
            
            {rating &&
              <div className={classes.rating}>
                <Typography type="caption">
                  {rating}%
                </Typography>
                <Typography type="caption">
                  Rating
                </Typography>
              </div>
              }

              <IconButton
                id="yes"
                label="like"
                className={likeClass} 
                aria-label="Like book"
                onClick={this._saveLike}>
                <ThumbUp />
              </IconButton>

              <IconButton 
                id="no"
                className={notLikeClass} 
                aria-label="Dislike book"
                onClick={this._saveNotLike}>
                <ThumbDown />
              </IconButton>

            </div>
        )
    }

    _saveLike = (event) => {
      const book = (this.props.userBook[this.props.bookId]) ? this.props.userBook[this.props.bookId] : {}
      const currentFavorite = (book.favorite) ? book.favorite : false
      const currentLike = (book.like) ? (book.like) : false
      const like = (currentLike === 'yes') ? false : 'yes'
      const favorite = (!like) ? false : currentFavorite
      
      this.props.dispatch(
        saveFavoriteStatus(
          this.props.bookId, 
          this.props.uid,
          favorite,
          like
        ))
    }

    _saveNotLike = (event) => {
      const book = (this.props.userBook[this.props.bookId]) ? this.props.userBook[this.props.bookId] : {}
      const currentFavorite = (book.favorite) ? book.favorite : false
      const currentLike = (book.like) ? (book.like) : false
      const like = (currentLike === 'no') ? false : 'no'
      const favorite = (!like || like === 'no') ? false : currentFavorite
      
      this.props.dispatch(
        saveFavoriteStatus(
          this.props.bookId, 
          this.props.uid,
          favorite,
          like
        ))
    }

}

Like.propTypes = {
  classes: PropTypes.object.isRequired,
  uid: PropTypes.string,
  userBook: PropTypes.object.isRequired,
  bookId: PropTypes.string.isRequired,
}
  
 
export default connect(mapStateToProps)(withStyles(styles)(Like))