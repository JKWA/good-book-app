import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog'
import { saveUserName } from '../../actions/userActions'
import IconButton from 'material-ui/IconButton'
import EditIcon from 'material-ui-icons/Edit'

const mapStateToProps = state => {
    return {
      userName: state.user.displayName,
      uid: state.user.uid,
    }
}


const styles = theme => ({

    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        margin: '10px',
    },

})

class EditName extends Component {
  
  constructor() {
    super()
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleRequestClose = this.handleRequestClose.bind(this)
    this._nameChange= this._nameChange.bind(this)
    this.state = {editNameValue: '', open: false,};
    this.setLocalState = this.setState
  }

  _nameChange = (event) => {
     console.log(event.target.value)
     this.setState({ editNameValue: event.target.value });
  }
   
  handleClickOpen = () => {
    this.setLocalState({ open: true });
  }

  handleRequestClose = () => {   
    this.setLocalState({ open: false });
  }

  handleSaveName = (event) => {
    const name = this.state.editNameValue,
          uid = this.props.uid

    if (!name){
        return false;
    }
    if(this.props.uid){
      this.setLocalState({ open: false })   
      this.props.dispatch(saveUserName(name, uid))
    }
  };

  

  render() {
    

    return (

      <div>
        <IconButton  
            aria-label="Edit name"
            onClick={this.handleClickOpen}>
            <EditIcon />
        </IconButton>
        <Dialog open={this.state.open} onRequestClose={this.handleRequestClose}>
          <DialogTitle>{'Edit Name'}</DialogTitle>
          <DialogContent>

            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
              onChange={this._nameChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSaveName} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

EditName.propTypes = {
  userName: PropTypes.string,
  uid: PropTypes.string.isRequired,
}

export default connect(mapStateToProps)(withStyles(styles)(EditName))
