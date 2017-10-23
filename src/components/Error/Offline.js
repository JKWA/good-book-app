import React, { Component } from 'react'
import Toast from 'material-ui/Snackbar';
 
  
class Offline extends Component {

    render() {
        
        return (   
          <Toast
          open={this.props.open}
          message="You are offline"
        />  
        )
    }
}

export default Offline