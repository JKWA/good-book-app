import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { fetchBooks } from "../../actions/bookActions"
import { FormControl, FormHelperText } from 'material-ui/Form'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'

import Input, { InputLabel } from 'material-ui/Input'
import { CircularProgress } from 'material-ui/Progress'
import CheckIcon from 'material-ui-icons/Check'
import SaveIcon from 'material-ui-icons/Search'
import green from 'material-ui/colors/green'
import ErrorMessage from "../Error/Message"


const mapStateToProps = state => {
    return {
        fetching: state.book.fetching,
        fetched: state.book.fetched,
        fetchError: state.book.fetchError,
    }
  }

  const styles = theme => ({

    wrapper: {
        position: 'relative',
      },
      successButton: {
        backgroundColor: green[500],
        '&:hover': {
          backgroundColor: green[700],
        },
      },

      progress: {
        color: green[500],
        position: 'absolute',
        top: -2,
        left: -2,
      },

    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        padding: theme.spacing.unit,
    },
    
    formControl: {
        margin: theme.spacing.unit,
    },

    error: {
        color: theme.palette.error[500],
    },
 
  });
  
class Search extends React.Component {

    constructor() {
        super()
        this._updateQuery= this._updateQuery.bind(this)
        this._submitQuery= this._submitQuery.bind(this)        
        this.state = {queryString: '', error:null};
        this.setLocalState = this.setState
      }


    render() {
        const classes = this.props.classes
        let buttonClass = '';
        
        if (this.props.fetching) {
            buttonClass = classes.successButton
        }
        return (
  
                <form onSubmit={this._submitQuery}>
                    <Paper className={classes.container}>
                    <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="name-helper">Title</InputLabel>
                        <Input error={this.state.error} type="text" onChange={this._updateQuery.bind(this)} placeholder="Search for books" aria-label="Book title" val={this.props.query} ref="queryTitle" />
                        {this.state.error && <FormHelperText className={classes.error}>Add a title</FormHelperText>}
                    </FormControl>
                    <div className={classes.wrapper}>
                        <Button fab type="submit" color="primary" className={buttonClass} aria-label="Search for book title">
                            {this.props.fetching ? <CheckIcon /> : <SaveIcon />}
                        </Button>
                            {this.props.fetching && <CircularProgress size={60} className={classes.progress} />}
                    </div>
                    {this.props.fetchError && 
                        <ErrorMessage message={this.props.fetchError.message} />
                    }
                    </Paper>
                </form>
            
           
        )
    }

    _updateQuery(event){
        const queryString = event.target.value
        const validInput = this.validateInput(queryString)
        this.setLocalState({queryString: queryString, error: !validInput})
    }

    _submitQuery(event) {
        event.preventDefault();
        
        if(this.state.error){
            return;
        }

        this.props.dispatch(fetchBooks(this.state.queryString));

    }


    validateInput(query){
        if(query.length >=1){
            return true;
        }
        return false;
    }

}

  Search.propTypes = {
    classes: PropTypes.object.isRequired,
    queryString: PropTypes.object,
    error: PropTypes.object,
    fetching: PropTypes.bool,
    fetched: PropTypes.bool,
  };
  

export default connect(mapStateToProps)(withStyles(styles)(Search))