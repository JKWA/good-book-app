import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Paper from 'material-ui/Paper'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import SearchIcon from 'material-ui-icons/Search'
import FavoriteIcon from 'material-ui-icons/Favorite'
import LikeIcon from 'material-ui-icons/ThumbUp'
import AccountIcon from 'material-ui-icons/AccountCircle'
import { openLoginDialog } from '../actions/userActions'


const mapStateToProps = state => {
  return {
    signedIn: state.user.signedIn,
    
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
        height: '100%',
      },

      subheading:{
        marginTop: theme.spacing.unit,
      },

      listItem:{
        textDecoration: 'none',
        cursor: 'pointer',
        background: theme.palette.background.paper,
      },

    })

class Home extends Component {
  constructor(props) {
    super(props)
    // this._setRoute = this._setRoute.bind(this)
    this._signIn = this._signIn.bind(this)
  }
  
  
  render() {
    const classes = this.props.classes

    return (
      <div>
        

        <Paper className={classes.container}>
          
          <Typography type="headline">
            Home
          </Typography>

          <Typography type="subheading" className={classes.subheading}>
            With this application you can:
          </Typography>
          
          <List>

            <Link className={classes.listItem}  to={"search"}>
            <ListItem>
              <ListItemIcon>
                <SearchIcon />
              </ListItemIcon>
              <ListItemText primary={"Search for books"}/>
              </ListItem>
            </Link>

            <Link className={classes.listItem}  to={"highest_rated"}>
            <ListItem>
              <ListItemText inset={true} primary={"View highest rated books"}/>
              </ListItem>
            </Link>

            {!this.props.signedIn && 
            <ListItem className={classes.listItem} onClick={this._signIn}>
              <ListItemIcon>
                <AccountIcon />
              </ListItemIcon>
              <ListItemText primary={"Sign in"}/>
            </ListItem>
            }

            <ListItem>
              <ListItemIcon>
                  <LikeIcon />
              </ListItemIcon>
              <ListItemText primary={"Like books"}/>
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <FavoriteIcon />
              </ListItemIcon>
              <ListItemText primary={"Save your favorite books"}/>
            </ListItem>

          </List>
         

        </Paper>

      </div>
    )
  }

  _signIn = () => {
    this.props.dispatch(openLoginDialog())
  }

 
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,  
}


export default connect(mapStateToProps)(withStyles(styles)(Home))

