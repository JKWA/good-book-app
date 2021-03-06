import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import ErrorBoundry from "../components/Error/ErrorBoundry"
import Paper from 'material-ui/Paper'


const mapStateToProps = state => {
  return {
    topics: [
      {
        title: 'React 16',
        link: 'https://reactjs.org/',
        description: 'Facebook\'s opensource JavaScript library for building user interfaces.'
      },
      {
        title: 'Create React App',
        link: 'https://github.com/facebookincubator/create-react-app',
        description: 'An open-source project for creating React apps with no build configuration.'
      },
      {
        title: 'Redux',
        link: 'http://redux.js.org/',
        description: 'Dan Abramov and Andrew Clark\'s open-source JavaScript library designed for managing application state.'
      },
      {
        title: 'Material UI',
        link: 'http://www.material-ui.com/',
        description: 'Call-Em-All\'s set of components for implementing Material Design.'
      },

      {
        title: 'Firestore',
        link: 'https://firebase.google.com/docs/firestore/',
        description: 'A NoSQL document-store to save and sync data.'
      },

      {
        title: 'Firebase Functions',
        link: 'https://firebase.google.com/docs/functions/',
        description: 'Triggers backend code in response to events triggered by Firestore and Auth.'
      },

      {
        title: 'Other',
        link: '',
        description: 'Error handeling, CORS, CSS Grid Layout, Google\'s book API '
      },

      

      
    ],
    
  }
}

const styles = theme => ({
  
      container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        padding: theme.spacing.unit*2,
        marginBottom: theme.spacing.unit*2,
      },
    })

class Technology extends Component {
  
  
  render() {
    const classes = this.props.classes
    
    const mappedTopics = this.props.topics.map((topic, index) => 
      <ErrorBoundry key={index}>
        <a href={topic.link} style={{textDecoration: 'none', cursor: 'pointer'}}>
          <div className={classes.container}>
            <Typography type="heading">{topic.title}</Typography>
            <Typography type="body1">{topic.description}</Typography>
          </div>
        </a>
      </ErrorBoundry>
      )

    return (
      <div>
        

        <Paper className={classes.container}>
          
          <Typography type="headline">
            Services behind the Good Book app
          </Typography>

        {mappedTopics}
        </Paper>

      </div>
    )
  }
}

Technology.propTypes = {
  classes: PropTypes.object.isRequired,  
  data: PropTypes.array.isRequired,
}


export default connect(mapStateToProps)(withStyles(styles)(Technology))

