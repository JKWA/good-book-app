import React, { Component } from 'react'
import Toast from 'material-ui/Snackbar';
 
  
class SlowDatabase extends Component {

    render() {
        
        return (   
          <Toast
          open={this.props.open}
          message="Database is catching up."
        />  
        )
    }
}

  

export default SlowDatabase