
import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as firebase from 'firebase'
import { updateFavoriteBookDetails, deleteFavoriteBook } from '../../actions/userActions'




const mapStateToProps = state => {
  return {
     uid: state.user.uid,
     userBook: state.user.favoriteBook,
  }
}



class UserBookData extends Component {

  constructor(props){
    super(props)
    this.firestoreListener = {}
    firebase.auth()
    .onAuthStateChanged(user => {
        if(user){
            const ref = firebase.firestore().doc(`user/${user.uid}`)
            .collection(`book`)
            .where('favorite', '==', true)
            ref.onSnapshot((snap) =>{
    
                snap.docChanges.forEach((book) => {
                    
                    if(book.type === 'added'){
                       
                        this.firestoreListener[book.doc.id] = firebase.firestore().doc(`book/${book.doc.id}`)
                        .onSnapshot((detail) => {
                            console.log('local', detail.metadata.fromCache)
                            this.props.dispatch(
                                updateFavoriteBookDetails(
                                    book.doc.id, 
                                   (detail.exists) ? detail.data() : {}
                                ))
                        }) 
                    }

                    if(book.type === 'modified'){
                        console.log('MODIFIED')

                    }

                    if(book.type === 'removed'){
                        this.props.dispatch(deleteFavoriteBook(book.doc.id))
                        this.firestoreListener[book.doc.id]() 
                        
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

  
  export default connect(mapStateToProps)(UserBookData)

  
  