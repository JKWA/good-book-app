//TODO fade image in
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import grey from 'material-ui/colors/grey';
import Like from './Like'
import Favorite from './Favorite'
import BookDescription from './Description'
import Paper from 'material-ui/Paper'


const styles = theme => ({

  mediaSmall: {
    gridColumnStart: 'first',
    gridColumnEnd: 'end',
    gridRowStart: 'header-start',
    gridRowEnd: 'header-end',
    objectFit: 'cover',
    height: '250px',
    width: '100%',
    opacity: 0, 
    transition: 'opacity 2s' 
  },

  mediaLarge: {
    gridColumnStart: 'first',
    gridColumnEnd: 'middle',
    gridRowStart: 'header-start',
    gridRowEnd: 'footer-end',
    objectFit: 'cover',
    width: '100%',
    opacity: 0, 
    transition: 'opacity 2s' 
  },

  contentSmall: {
    gridColumnStart: 'first',
    gridColumnEnd: 'end',
    gridRowStart: 'details-start',
    gridRowEnd: 'details-end',
    padding: theme.spacing.unit,
  },

  contentTablet: {
    gridColumnStart: 'middle',
    gridColumnEnd: 'end',
    gridRowStart: 'header-start',
    gridRowEnd: 'details-end',
    padding: theme.spacing.unit,
  },

  contentLaptop: {
    gridColumnStart: 'middle',
    gridColumnEnd: 'end',
    gridRowStart: 'header-start',
    gridRowEnd: 'details-end',
    padding: theme.spacing.unit,
    minHeight: '300px',
  },

  actionSmall: {
    gridColumnStart: 'first',
    gridColumnEnd: 'end',
    gridRowStart: 'footer-start',
    gridRowEnd: 'footer-end',
    display: 'flex',
    borderTopStyle: 'solid',
    borderTopColor: theme.palette.secondary[200],
    borderTopWidth: '1px',
    margin: theme.spacing.unit,
    
  },

  actionLarge: {
    gridColumnStart: 'middle',
    gridColumnEnd: 'end',
    gridRowStart: 'footer-start',
    gridRowEnd: 'footer-end',
    display: 'flex',
    borderTopStyle: 'solid',
    borderTopColor: theme.palette.secondary[200],
    borderTopWidth: '1px',
    margin: theme.spacing.unit,
    
  },
  
  card: {
    display: 'grid',
    gridTemplateColumns: '[first] 200px [middle] auto [end]',
    gridTemplateRows: '[header-start] 25% [header-end details-start] auto [details-end footer-start] 70px [footer-end]',
  },

  item:{
    marginTop: theme.spacing.unit*2,
    marginBottom: theme.spacing.unit*2,
    maxWidth: '550px',
  },


  image:  { 
    opacity: 0, 
    transition: 'opacity 5s' 
  },

  imageLoaded: { 
      opacity: 1
  },
 
  title: {
    marginBottom: theme.spacing.unit*2,
    fontSize: 24,
    color: theme.palette.text.primary,
  },

  subTitle: {
    marginBottom: theme.spacing.unit*2,
    color: theme.palette.text.primary,
  },

  author: {
    marginBottom: theme.spacing.unit,
    color: theme.palette.text.primary,
  },

  publishedDate: {
    marginBottom: theme.spacing.unit,
    color: theme.palette.text.secondary,
  },

  description: {
    marginBottom: theme.spacing.unit,
    color: theme.palette.text.secondary,
  },
})

const mapStateToProps = state => {
  
  return {
     uid: state.user.uid,
     userBook: state.user.book,
     display: state.layout.displaySize.size,
     width: state.layout.displaySize.width,
     userSaveError: state.user.userSaveError,
  }
}

class Card extends Component {

  constructor(props) {
    super(props)
    this.state ={ loaded: false }
}

  componentDidMount() {
    this.setState({ loaded: true });
  }


  render() {
      const classes = this.props.classes
      const authors = (this.props.authors) ? this.props.authors : []
      let authorString

      if(authors.length === 0){
        authorString = ''
      }else if(authors.length === 1){
        authorString = authors[0]
      }else if(authors.length === 2){
        authorString = `${authors[0]} and ${authors[1]}`
      }else{
        const lastAuthor = authors.pop();
        authorString = authors.join(', ')+', and '+lastAuthor
      }

      const imageLink = (this.props.imageLinks) ? this.props.imageLinks.thumbnail.replace('http', 'https') : '' // hacky solution, Google should default to https
      const mediaClass = (this.props.display === 'phone') ? classes.mediaSmall : classes.mediaLarge
      const contentClass = (this.props.display === 'phone') ? classes.contentSmall : (this.props.display === 'wide') ? classes.contentLaptop : classes.contentTablet
      const actionClass = (this.props.display === 'phone') ? classes.actionSmall : classes.actionLarge

      return (
        <div>
        <Paper className={classes.item} zdepth={1}>
          <div className={classes.card}>
            <img className={mediaClass} style={{backgroundColor: grey[100], opacity: (this.state.loaded) ? 1 : false}} width="242" src={imageLink} alt={this.props.title}/>
         
            <div className={contentClass}>
              <Typography type="headline" className={classes.title}>
                {this.props.title}
              </Typography>
              <Typography type="subheading" className={classes.subTitle}>
                {this.props.subtitle}
              </Typography> 
              <Typography type="subheading" className={classes.author}>
                {authorString}
              </Typography>
              <Typography type="subheading" className={classes.publishedDate}>
                {(this.props.publishedDate) ? this.props.publishedDate.slice(0,4) : null}
              </Typography>
              <BookDescription description={this.props.description}/>
            </div>
            
            <div className={actionClass}>
              <Like bookId={this.props.bookId} rating={this.props.percentLike}/>
              <Favorite bookId={this.props.bookId} rating={this.props.favorite}/>
            </div>

          </div>
        </Paper>
      
       </div>
      );
    }
  }

  Card.propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.string,
    bookId: PropTypes.string.isRequired,
    description: PropTypes.string,
    publishedDate: PropTypes.string,
    subtitle: PropTypes.string,
    authors: PropTypes.array,
  }
  
  export default connect(mapStateToProps)(withStyles(styles)(Card))
  