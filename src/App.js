import React, { Component } from 'react'
import 'typeface-roboto'
import { Provider } from 'react-redux'
import store from './store'
import Layout from './Layout'
import * as firebase from 'firebase'


const firebaseConfig = {
    apiKey: "AIzaSyDupjMqOh55o5eVQLlOjfYPAJl4sg6O9JE",
    authDomain: "book-fly.firebaseapp.com",
    databaseURL: "https://book-fly.firebaseio.com",
    projectId: "book-fly",
    storageBucket: "book-fly.appspot.com",
    messagingSenderId: "446613618196",
  }

  require("firebase/firestore");
 
  firebase.initializeApp(firebaseConfig)
  firebase.firestore().enablePersistence()


class App extends Component {

  render() {
    return (
      
      <Provider store={store}>
        <div>
          <Layout/>
        </div>
      </Provider>
    );
  }
}

export default App
