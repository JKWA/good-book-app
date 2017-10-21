import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import ErrorIcon from 'material-ui-icons/Error'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'

 

  const styles = theme => (
    // console.log(theme)
    {

   

    container: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        border: 'solid',
        borderColor: theme.palette.error[200],
        borderWidth: '1px',
        padding: theme.spacing.unit,
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        background: theme.palette.background.paper,
        width:'100%',
    },
   
    errorIcon: {
        color: theme.palette.error[500],
        marginRight: theme.spacing.unit*2,
    },
 
  });
  
class Message extends Component {

    // constructor(props) {
    //     super(props)
    //     this.state = {error:null};
    //     this.setLocalState = this.setState
    //   }

    render() {
        const classes = this.props.classes;
        
        return (     
          <div className={classes.container}>
            <ErrorIcon className={classes.errorIcon}/>
            <Typography type="body1" className={classes.rating}>
              {this.props.message}
            </Typography>
          </div>
        )
    }

}

Message.propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.string,
  

}
  

export default withStyles(styles)(Message)