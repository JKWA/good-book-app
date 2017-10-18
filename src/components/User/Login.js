/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import { FormHelperText } from 'material-ui/Form'

import Card, { CardActions, CardContent } from 'material-ui/Card'

import AppBar from 'material-ui/AppBar'
import Tabs, { Tab } from 'material-ui/Tabs';
import Toolbar from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import CloseIcon from 'material-ui-icons/Close'
import Slide from 'material-ui/transitions/Slide'
import GoogleButton from 'react-google-button'
import { loginWithEmail, loginWithGoogle, createUserWithEmail, openLoginDialog, closeLoginDialog } from "../../actions/userActions"

 
const mapStateToProps = state => {
    return {
      userName: state.user.displayName,
      uid: state.user.uid,
      openLoginDialog: state.user.openLoginDialog,
      loginAccountError: state.user.loginAccountError,
      loginEmailError: state.user.loginEmailError,
      loginPasswordError: state.user.loginPasswordError,
    }
}

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  card: {
    margin:'15px 5px',
    maxWidth: '400px',
  },
  error: {
    color:'red',
  },
})

class Login extends Component {
  
constructor() {
    super()
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleRequestClose = this.handleRequestClose.bind(this)
    this.handleChange = this.handleChange.bind(this)
    
    this._loginEmailChange= this._loginEmailChange.bind(this)
    this._passwordChange= this._passwordChange.bind(this)
    this._loginWithEmail= this._loginWithEmail.bind(this)
    this._loginWithGoogle= this._loginWithGoogle.bind(this)
    
    this._createUserWithEmail= this._createUserWithEmail.bind(this)
    
    this.state = {editNameValue: '', open: true, tabValue:0};
    this.setLocalState = this.setState
  }


  render() {
   const classes = this.props.classes
    return (
      <div>
        <Dialog
          fullScreen
          open={this.props.openLoginDialog}
          onRequestClose={this.handleRequestClose}
          transition={<Slide direction="up" />}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="contrast" onClick={this.handleRequestClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Tabs value={this.state.tabValue} onChange={this.handleChange}>
                <Tab label="Email" />
                <Tab label="Social" />
              </Tabs>
            
            </Toolbar>
          </AppBar>
        { this.state.tabValue === 1 &&
          
          <Card className={classes.card}>
          <CardContent>
          
          <GoogleButton onClick={this._loginWithGoogle}/>
          
          </CardContent>
          </Card>
        }
        { this.state.tabValue === 0 &&
          
          <Card className={classes.card}>
            <CardContent>
              <TextField
                autoFocus
                error={this.props.loginEmailError}
                margin="dense"
                id="name"
                label="Email"
                type="email"
                fullWidth
                onChange={this._loginEmailChange}
              />
              {this.props.loginEmailError && <FormHelperText className={classes.error}>{this.props.loginEmailError.message}</FormHelperText>}
              <TextField
                autoFocus
                error={this.props.loginPasswordError}
                margin="dense"
                id="name"
                label="Password"
                type="password"
                fullWidth
                onChange={this._passwordChange}
              />
              {this.props.loginPasswordError && <FormHelperText className={classes.error}>{this.props.loginPasswordError.message}</FormHelperText>}

              { this.props.loginAccountError && <Typography className={classes.error}> {this.props.loginAccountError.message}</Typography>}
            </CardContent>
            <CardActions>
              
              <Button onClick={this._loginWithEmail} color="primary">
                Sign in
              </Button>
              <Button onClick={this._createUserWithEmail} color="primary">
                Create Account
              </Button>
              <Button onClick={this.handleRequestClose} color="primary">
                Cancel
              </Button>
            </CardActions>
          </Card>
       
        }

        </Dialog>
      </div>
    );
  }
  handleClickOpen = () => {
    this.props.dispatch(openLoginDialog())
  };

  handleRequestClose = () => {
    this.props.dispatch(closeLoginDialog())
  };

  handleChange = (event, value) => {
    this.setLocalState({tabValue: value})
  };

  _loginEmailChange = (event) => {
    this.setLocalState({loginEmail: event.target.value})
  }

  _passwordChange = (event) => {
    this.setLocalState({password: event.target.value})
  }

  _loginWithEmail = () => {
    const email = this.state.loginEmail,
          password = this.state.password

    this.props.dispatch(loginWithEmail(email, password))
  }

  _loginWithGoogle= (event) => {
    console.log('login google')
    this.props.dispatch(loginWithGoogle())
}

  _createUserWithEmail = (event) => {
    const email = this.state.loginEmail,
          password = this.state.password

    this.props.dispatch(createUserWithEmail(email, password))
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  userName: PropTypes.string,
  uid: PropTypes.string,
  openLoginDialog: PropTypes.bool,
  loginAccountError: PropTypes.object,
  loginEmailError: PropTypes.object,
  loginPasswordError: PropTypes.object,
}

export default connect(mapStateToProps)(withStyles(styles)(Login))


