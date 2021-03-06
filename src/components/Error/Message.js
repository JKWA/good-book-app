import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import ErrorIcon from 'material-ui-icons/Error'
import Typography from 'material-ui/Typography'

 

  const styles = theme => (

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

    constructor(props) {
        super(props)
        this.state = {show:true}
        this.setLocalState = this.setState
      }

      // componentDidMount() {
      //   this.timer = 
      // }
      

    // componentWillUnMount() {
    //   clearTimeout(this.timer);
    // }
    

    render() {
        const classes = this.props.classes;
        
        return (    
          <div>
          {this.state.show &&
          <div className={classes.container}>
            <ErrorIcon className={classes.errorIcon}/>
            <Typography type="body1" className={classes.rating}>
              {this.props.message}
            </Typography>
          </div>
          }
          </div>
        )
    } 

}

Message.propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.string,
  

}
  

export default withStyles(styles)(Message)