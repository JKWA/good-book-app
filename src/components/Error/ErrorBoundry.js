import React, { Component } from 'react'


class ErrorBoundary extends Component {
    constructor(props) {
      super(props);
      this.state = { error: null, errorInfo: null };
    }
    
    componentDidCatch(error, errorInfo) {
      this.setState({
        error: error,
        errorInfo: errorInfo
      })
      // log error message
    }
    
    render() {
      if (this.state.errorInfo) {
        // Error path
        return (
          <div>
            <h2>Error</h2>
           
          </div>
        )
      }
      // Normally, just render children
      return this.props.children;
    }  
  }

  export default ErrorBoundary