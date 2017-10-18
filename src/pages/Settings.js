import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import EditName from '../components/User/EditName'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'

const mapStateToProps = state => {
  return {
      userName: state.user.displayName,
      email: state.user.email,
      initialLogin: state.user.initialLogin,
      signedIn: state.user.signedIn,
  }
}


const styles = theme => ({
  
      container: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-start',
          flexWrap: 'wrap',
          margin: '10px',
      },
      text: {
        margin: '15px 10px',
      }
  
  })

class Settings extends Component {


  render() {
   const classes = this.props.classes
    return (
      <div>
        
        <Typography type="headline">
          Settings
        </Typography>
          { this.props.signedIn &&
          <div>
            <div className={classes.container}>
              <div className={classes.text}>Name: {this.props.userName} </div>
              <EditName/>
            </div>
            <div  className={classes.container}>
              <div className={classes.text}>Email: {this.props.email}</div>
            </div>
          </div>
          }
      
      </div>
    )
  }
}

Settings.propTypes = {
  classes: PropTypes.object.isRequired,
  userName: PropTypes.string,
  email: PropTypes.string,
  initialLogin: PropTypes.number,
  signedIn: PropTypes.bool.isRequired,
}

export default connect(mapStateToProps)(withStyles(styles)(Settings))

