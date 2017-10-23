import React, { Component } from 'react'
import Toast from 'material-ui/Snackbar';
 
  
class Offline extends Component {

  constructor(props) {
    super(props)
    this.state = {open: true,}
    
  }

    render() {
        
        return (   
          <Toast
          open={this.props.open}
          message="You are offline"
          autoHideDuration={4000}
        />  
        )
    }
    handleRequestClose = () => {
      this.setState({
        open: false,
      });
    };

}

  

export default Offline