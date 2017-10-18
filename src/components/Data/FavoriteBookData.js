
import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as firebase from 'firebase'
// import { updateFavoriteBookDetails, deleteFavoriteBook } from '../../actions/userActions'
import { addHighRatedBook } from '../../actions/bookActions'



const mapStateToProps = state => {
  return {
     uid: state.user.uid,
     userBook: state.user.favoriteBook,
  }
}



class FavoriteBookData extends Component {

  constructor(props){
    super(props)
    
        this.firestoreListener = firebase.firestore()
            .collection(`book`)
            .orderBy('percentLike', 'desc')
            .limit(50)
            .onSnapshot((snap) =>{
    
                snap.docChanges.forEach((book) => {
                    
                    if(book.type === 'added'){
                        this.props.dispatch(addHighRatedBook(book.doc.id, (book.doc.data()) ? book.doc.data() : {}))  
                    }

                    if(book.type === 'modified'){
                        this.props.dispatch(addHighRatedBook(book.doc.id, (book.doc.data()) ? book.doc.data() : {}))  
                    }

                    if(book.type === 'removed'){
                        //remove data
                        // this.props.dispatch(deleteFavoriteBook(book.doc.id))
                        
                    } 
                })
            })
  

  }

  componentWillUnmount(){

    this.firestoreListener();
  }
  

  render() {
      
      return (
        <div/>
      )
    }
  }

  
  export default connect(mapStateToProps)(FavoriteBookData)

  
  