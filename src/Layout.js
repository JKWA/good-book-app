
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { MuiThemeProvider, createMuiTheme, withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'
import { openDrawer } from "./actions/layoutActions"
import Drawer from 'material-ui/Drawer'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'

import blueGrey from 'material-ui/colors/blueGrey'
import deepPurple from 'material-ui/colors/deepPurple'
import red from 'material-ui/colors/red'
import grey from 'material-ui/colors/grey';

import Divider from 'material-ui/Divider'
import HomeIcon from 'material-ui-icons/Home'
import SearchIcon from 'material-ui-icons/Search'
import SettingsIcon from 'material-ui-icons/Settings'
import FavoriteIcon from 'material-ui-icons/Favorite'
import LikeIcon from 'material-ui-icons/ThumbUp'

import BookSearchPage from './pages/SearchBook'
import SettingsPage from './pages/Settings'
import HomePage from './pages/Home'
import FavoriteBooksPage from './pages/FavoriteBook'
import HighestRatedPage from './pages/HighestRatedBook'
import TechnologyPage from './pages/Technology'


import Login from './components/User/Login'
import UserBookData from './components/Data/UserBookData'
import UserData from './components/Data/UserData'
import OfflineToast from './components/Error/Offline'


import { closeDrawer, setRoute, setDisplaySize, updateOfflineStatus } from './actions/layoutActions'
import { signOut, watchAuthStatus, openLoginDialog } from './actions/userActions'

const theme = createMuiTheme({
  palette: {
    primary: blueGrey,
    secondary: deepPurple,
    error: red,
  },
})

const mapStateToProps = state => {
    return {
      openDrawer: state.layout.openDrawer,
      dockedDrawer: state.layout.dockedDrawer,
      size: state.layout.displaySize.size,
      signedIn: state.user.signedIn,
      offline: state.layout.offline,
      uid: state.user.uid,
      openLoginDialog: state.layout.openLoginDialog,
      route: state.layout.route,
      routes: {
        home:{ 
          path: '/',
          exact: true,
          name:'home',
          title:'Home',
          main: HomePage,
        },
        search:{ 
          path: '/search',
          name:'search',
          title:'Search Books',
          main: BookSearchPage,
        },
  
        favorite:{ 
          path: '/favorite',
          name:'favorite',
          title:'My Favorites',
          main: FavoriteBooksPage,
        },

        like:{ 
          path: '/highest_rated',
          name:'highest_rated',
          title:'Highest Rated',
          main: HighestRatedPage,
        },
  
        settings:{ 
          path: '/settings',
          name:'settings',
          title:'Settings',
          main: SettingsPage,
        },

        technology:{ 
          path: '/techology',
          name:'technology',
          title:'Services',
          main: TechnologyPage,
        },
        
      }, 
    }
  }

  
const styles = theme => ({

  flex: {
    flex: 1,
  },

  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },

  list: {
    width: 250,
    flex: 'initial',
  },

  listItem:{
    textDecoration: 'none',
    background: theme.palette.background.paper,
  },

  listFull: {
    width: 'auto',
    flex: 'initial',
  },

  drawerPaper: {
    position: 'relative',
    height: '100%',
  },

  drawerHeader: {
    margin: '12px auto',
  },

  content: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit,
    height: 'calc(100vh - 72px)',
    marginTop: '56px',
    overflowY: 'scroll',
    overflowScrolling: 'touch',
  },

})

class Layout extends Component {
    constructor(props) {
        super(props)
        this._setRoute = this._setRoute.bind(this)
        this._signIn = this._signIn.bind(this)
        this._signOut = this._signOut.bind(this)
        this.state = { width: '0', height: '0' }
        this._updateWindowDimensions = this._updateWindowDimensions.bind(this)
        this._updateOfflineStatues = this._updateOfflineStatues.bind(this)
        
      }

      componentDidMount() {
        this.props.dispatch(watchAuthStatus()) 
        this._updateWindowDimensions()
        window.addEventListener('resize', this._updateWindowDimensions)  
        window.addEventListener('online', this._updateOfflineStatues) 
        window.addEventListener('offline', this._updateOfflineStatues)     
        
      }

      _updateWindowDimensions() {
        this.props.dispatch(setDisplaySize(window.innerHeight, window.innerWidth))
        this.setState({ width: window.innerWidth, height: window.innerHeight })
      }


    render() {
        const classes = this.props.classes
        const allRoutes = Object.values(this.props.routes)
        const route = this.props.routes
        const home = route.home
        const settings = route.settings
        const search = route.search
        const favorite = route.favorite
        const like = route.like
        const technology = route.technology
        const history = createBrowserHistory()
        const location = (history.location) ? history.location.pathname : null
        

        return (
        <MuiThemeProvider theme={theme}>
        <div>
          <UserData />
          <UserBookData />
          <OfflineToast open={this.props.offline}/>
          
          <Login/>
          <Router >
            <div>
              <AppBar position="absolute">
                  <Toolbar>
                  <IconButton className={classes.menuButton} color="contrast" aria-label="Menu" onClick={this._openDrawer.bind(this)}>
                      <MenuIcon />
                  </IconButton>
                  <Typography type="title" color="inherit" className={classes.flex}>
                      Good Book
                  </Typography>
                  {(this.props.signedIn) ? <Button color="contrast" onClick={this._signOut} aria-label="Sign out">Sign out</Button> : <Button color="contrast" onClick={this._signIn} aria-label="Sign in">Sign in</Button>}
                  </Toolbar>
              </AppBar>
      
              <Drawer 
                open={this.props.openDrawer} 
                onRequestClose={this._closeDrawer.bind(this)}>
                

                {allRoutes.map((route, index) => (
                  <Route
                      key={index}
                      path={route.path}
                      exact={route.exact}
                      component={() => <Typography className={classes.drawerHeader} type="headline">{route.title}</Typography>}
                  />
                ))}
                <Divider/>
          
                <div className={classes.list}>

                <List>

                    <Link className={classes.listItem} to={home.path}>
                        <ListItem 
                          id={home.name} 
                          button 
                          aria-label={home.title}
                          style={{backgroundColor: (location === `/`) ? grey[500] : null}}
                          onClick={this._setRoute}>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary={home.title}  />
                        </ListItem>
                      </Link>

                      <Link className={this.props.classes.listItem} to={like.path}>
                        <ListItem 
                          id={like.name} 
                          style={{backgroundColor: (location === `/${like.name}`) ? grey[500] : null}}
                          button 
                          aria-label={like.title}
                          onClick={this._setRoute}>
                            <ListItemIcon>
                              <LikeIcon />
                            </ListItemIcon>
                            <ListItemText primary={like.title}  />
                        </ListItem>
                      </Link>

                      <Link className={this.props.classes.listItem} to={search.path}>
                        <ListItem 
                          id={search.name} 
                          style={{backgroundColor: (location === `/${search.name}`) ? grey[500] : null}}
                          button 
                          aria-label={search.title}
                          onClick={this._setRoute}>
                            <ListItemIcon>
                              <SearchIcon />
                            </ListItemIcon>
                            <ListItemText primary={search.title}  />
                        </ListItem>
                      </Link>

                      <Link className={this.props.classes.listItem} to={favorite.path}>
                        <ListItem 
                          id={favorite.name} 
                          style={{backgroundColor: (location === `/${favorite.name}`) ? grey[500] : null}}
                          button 
                          aria-label={favorite.title}
                          onClick={this._setRoute}>
                            <ListItemIcon>
                              <FavoriteIcon />
                            </ListItemIcon>
                            <ListItemText primary={favorite.title}  />
                        </ListItem>
                      </Link>
                      
                      <Link className={classes.listItem} to={settings.path}>
                        <ListItem 
                          id={settings.name}
                          style={{backgroundColor: (location === `/${settings.name}`) ? grey[500] : null}}
                          button 
                          aria-label={settings.title}
                          onClick={this._setRoute}>
                          <ListItemIcon>
                            <SettingsIcon />
                          </ListItemIcon>
                        <ListItemText primary={settings.title}  />
                      </ListItem>
                  </Link>

                  <Link className={classes.listItem} to={technology.path}>
                    <ListItem 
                          id={technology.name}
                          style={{backgroundColor: (location === `/${technology.name}`) ? grey[500] : null}}
                          button 
                          aria-label={technology.title}
                          onClick={this._setRoute}>
                          
                        <ListItemText inset={true} primary={technology.title}  />
                      </ListItem>
                    </Link>
                  </List>
                </div>
            </Drawer>

            <div className={classes.content}>
          
              {allRoutes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={route.main}
                />
              ))}

            </div>
          </div>
        </Router>
      </div>
      </MuiThemeProvider>
      )
    }

    _updateOfflineStatues = (event) =>{
      console.log(event)
      const online = window.navigator.onLine
      console.log(online)
      
      this.props.dispatch(updateOfflineStatus(!window.navigator.onLine))
    }

    _openDrawer = (event) =>{
        this.props.dispatch(openDrawer())
    }

    _closeDrawer = (event) => { 
      //docked does not work correctly
      // if(this.props.size === 'phone' || this.props.size === 'tablet'){
        this.props.dispatch(closeDrawer())
      // }
    }
    
    _setRoute = (event) => {
      this.props.dispatch(setRoute(event.currentTarget.id ))
      this.props.dispatch(closeDrawer())
    }

    _signIn = () => {
      this.props.dispatch(openLoginDialog())
    }

    _signOut = (event) =>{
      console.log('sign out')
      this.props.dispatch(signOut())
    }
}


Layout.propTypes = {
  classes: PropTypes.object.isRequired,
  size: PropTypes.string,
}

export default connect(mapStateToProps)(withStyles(styles)(Layout))
