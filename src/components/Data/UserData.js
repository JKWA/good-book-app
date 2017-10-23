
import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as firebase from 'firebase'
import { updateUserData, addUserBookData, modifyUserBookData, removeUserBookData } from '../../actions/userActions'

const mapStateToProps = state => {
  return {
     uid: state.user.uid,
     userBook: state.user.favoriteBook,
  }
}



class FavoriteBookData extends Component {

  constructor(props){
    super(props)
    this.firestoreListener = {}
    firebase.auth()
    .onAuthStateChanged(user => {
        if(user){
            
            this.firestoreListener.user = firebase.firestore().doc(`user/${user.uid}`)
                .onSnapshot((snap) => {
                    const user = snap.exists ? snap.data() : {}
                    this.props.dispatch(updateUserData( user.displayName, 
                                                        user.email, 
                                                        user.initialLogin, 
                                                        user.book))
                })
            
            this.firestoreListener.book = firebase.firestore().collection('user').doc(user.uid).collection('book')
                .onSnapshot((snap) => {
                    snap.docChanges.forEach((bookChange) => {
                        console.log('type', bookChange.type)
                        if (bookChange.type === "added") {

                            this.props.dispatch(
                                addUserBookData(
                                    bookChange.doc.id, 
                                    Object.assign({}, (bookChange.doc.exists) ? bookChange.doc.data() : {}, {saved:true})
                            ))

                        }

                        if (bookChange.type === "modified") {
                            this.props.dispatch(
                                modifyUserBookData(
                                    bookChange.doc.id, 
                                    Object.assign({}, (bookChange.doc.exists) ? bookChange.doc.data() : {}, {saved:true})
                                )) 
                        }

                        if (bookChange.type === "removed") {
                            this.props.dispatch(
                                removeUserBookData(
                                    bookChange.doc.id, 
                            ))                        
                        }
                })
            })
    }else{
        //remove all listeners
        const listeners = Object.values(this.firestoreListener)
        for (let index in listeners){
            listeners[index]()
        }
    }

    })

  }
  

  render() {
      
      return (
        <div/>
      )
    }
  }

  
  export default connect(mapStateToProps)(FavoriteBookData)

  
  