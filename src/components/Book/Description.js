// Presentational component  

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'


const styles = theme => ({
  description: {
    marginBottom: theme.spacing.unit,
    color: theme.palette.text.secondary,
  },
  addButton: {
    color: 'blue',
    cursor: 'pointer',
  },
})

class Description extends Component {
  constructor(props){
    super(props)
    
    const description = (this.props.description) ? this.props.description : ''
    let shortenedDescription = description
    const stringToLong = (description.length > 200) ? true : false
    
    if(stringToLong){
      const cutPoint = description.substring(0,200).lastIndexOf(' ')
      shortenedDescription = description.substring(0, cutPoint)+' ...'
    }
    
    this.state = {hasMore:stringToLong, showingShort:stringToLong, shortDescription:shortenedDescription};
    this.setLocalState = this.setState
    this._toggleDescription = this._toggleDescription.bind(this)

  }

  render() {
      const classes = this.props.classes
      let showText = (this.state.showingShort) ? "Show More" : "Show Less"
      return(
        <div>
          {this.state.showingShort &&
          <Typography type="body1" className={classes.description}>
            {this.state.shortDescription}
          </Typography>
          }

          {!this.state.showingShort &&
            <Typography type="body1" className={classes.description}>
              {this.props.description}
            </Typography>
          }

          {this.state.hasMore &&
            <Typography type="caption" onClick={this._toggleDescription} className={classes.addButton}>
              {showText}
            </Typography>
          }
        
        </div>
      )
      
    }

     _toggleDescription = (event) => {
       this.setLocalState({showingShort: !this.state.showingShort})
    }
  }
  
 

Description.propTypes = {
  description: PropTypes.string,
};
  
export default withStyles(styles)(Description)
  
  