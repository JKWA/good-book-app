// TODO move _setBookIfNonExists() to server 


import * as firebase from 'firebase'


export function saveFavoriteStatus(bookId, uid, favorite, like){

    return (dispatch) => {
        if(!uid){
            dispatch({type: 'OPEN_LOGIN_DIALOG', payload: null})
            return
        }

        if(bookId){
            if(favorite || like){
                dispatch({type:'ADD_USER_BOOK_RATING', payload: {id:bookId, details:{favorite, like, saved:false}}})
            }else{
                dispatch({type: 'REMOVE_USER_BOOK', payload: bookId})   
            }
            const favRef = firebase.firestore().doc(`user/${uid}/book/${bookId}`)
           
            favRef.get().then(() => {console.log('testing')})
            const updateFavoriteStatus = new Promise((resolve, reject) =>{
                favRef.get()
                    .then((favDoc) =>{
                        console.log(favDoc)
                        
                        const deleteItem = (favDoc.exists) ? firebase.firestore.FieldValue.delete() : null
                        const updateFavorite = {
                            favorite: (favorite) ? favorite : deleteItem, 
                            like: (like) ? like : deleteItem
                        }
                        
                        return (favDoc.exists) ? favRef.update(updateFavorite) : favRef.set(updateFavorite)
                    })
                    .then(() => {
                        (!like && !favorite) ? resolve('DELETE') : resolve('SAVE')
                        return
                    })
                    .catch((error) =>{
                        console.log('ERROR', error)
                        reject('SAVE_ERROR')
                        return
                    })
                })

                updateFavoriteStatus.then((saveStatus) => {
                    
                    if(saveStatus === 'DELETE'){
                        firebase.firestore().batch().delete(favRef).commit()
                        return 
                    }

                    _setBookIfNonExists(bookId)
                        .then((book) =>{
                        
                        })
                        .catch((error) =>{
                            return console.log('SET_BOOK_DETAILS_ERROR', error)
                        })
                    })
        
            }else{
                console.log('NO_BOOK_ID')
            }
        }
    }
   
    
export function updateUserData(displayName, email, initialLogin, book){
    return (dispatch) => {
        dispatch({type: 'UPDATE_USER_DATA', 
                payload: {
                    displayName: (displayName) ? displayName : null,
                    email: (email) ? email : null,
                    initialLogin: (initialLogin) ? initialLogin : null,
                    // book: (user.book) ? book : {},
                }})
    }
}

export function addUserBookData(bookId, details){
    return (dispatch) => {

         dispatch({
                type: 'ADD_USER_BOOK_RATING', 
                payload: {
                    id:bookId, 
                    details:details 
                }})
        
    }
}

export function modifyUserBookData(bookId, details){
    return (dispatch) => {

         dispatch({
                type: 'MODIFY_USER_BOOK_RATING', 
                payload: {
                    id:bookId, 
                    details:details 
                }})
        
    }
}

export function removeUserBookData(bookId){
    return (dispatch) => {

         dispatch({
                type: 'REMOVE_USER_BOOK', 
                payload: bookId})
    }
}
   


export function updateFavoriteBookDetails(bookId, details){
    return (dispatch) => {
        dispatch({type: 'ADD_USER_FAVORITE_BOOK_DETAIL', 
        payload: {id: bookId, 
                  details: (details) ? details : {}
                  }
      })

    }
}



export function deleteFavoriteBook(bookId){
    return (dispatch) => {
        dispatch({type: 'REMOVE_USER_FAVORITE_BOOK_DETAIL', 
        payload: bookId
      })
    }
}



export function saveUserName(userName, uid){

    return (dispatch) => {
        dispatch({type: 'SAVING_DATA', payload:userName})
        firebase.firestore()
        .doc(`/user/${uid}`)
          .update({displayName:userName})
            .then(() =>{
                dispatch({type: 'SAVED_DATA', payload:userName})
            })
            .catch( error =>{
                dispatch({type: 'SAVE_ERROR', payload:error})
            })      
    }
}


export function watchAuthStatus(){
    
    return (dispatch) => {
    
        firebase.auth()
            .onAuthStateChanged(user => {
                if (user) {
                    dispatch({type: 'SIGN_IN', payload:user.uid})
                    
                } else {
                    dispatch({type: 'SIGN_OUT', payload:null})
                }
            })
        }    
}


export function loginWithGoogle(){
    return (dispatch) => {
    dispatch({type: 'INITIATE_LOGIN', payload:null})
    
    const provider = new firebase.auth.GoogleAuthProvider();
    // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

    firebase.auth()
        .signInWithPopup(provider)
        .catch(error => {
            dispatch({type: 'SIGN_IN_ERROR', payload:error})
        })
    }
}

export function createUserWithEmail(email, password){
    return (dispatch) => {
    dispatch({type: 'INITIATE_LOGIN', payload:null})
    
    console.log(email, password)
    firebase.auth()
    .createUserWithEmailAndPassword(email, password)
        .then( (result) => {
            console.log(result)
        })

 
        .catch((error) => {
            switch (error.code) {
                case 'auth/email-already-in-use':
                    dispatch({type: 'LOGIN_EMAIL_ERROR', payload:error})
                    break;
                case 'auth/invalid-email':
                    dispatch({type: 'LOGIN_EMAIL_ERROR', payload:error})
                    break;
                case 'auth/operation-not-allowed':
                    dispatch({type: 'LOGIN_ACCOUNT_ERROR', payload:error})
                    break;
                case 'auth/weak-password':
                    dispatch({type: 'LOGIN_PASSWORD_ERROR', payload:error})
                    break;
            
                default:
                    dispatch({type: 'LOGIN_ACCOUNT_ERROR', payload:error})
                
                    break;
            }
        });
    }
}

export function loginWithEmail(email, password){
    return (dispatch) => {
    dispatch({type: 'INITIATE_LOGIN', payload:null})
    
    console.log(email, password)
    firebase.auth()
    .signInWithEmailAndPassword(email, password)
        .then( (result) => {
            console.log(result)
        })
        .catch((error) => {
            switch (error.code) {
                case 'auth/invalid-email':
                    dispatch({type: 'LOGIN_EMAIL_ERROR', payload:error})
                    break;
                case 'auth/user-disabled':
                    dispatch({type: 'LOGIN_ACCOUNT_ERROR', payload:error})
                    break;
                case 'auth/user-not-found':
                    dispatch({type: 'LOGIN_ACCOUNT_ERROR', payload:error})
                    break;
                case 'auth/wrong-password':
                    dispatch({type: 'LOGIN_PASSWORD_ERROR', payload:error})
                    break;
            
                default:
                    dispatch({type: 'LOGIN_ACCOUNT_ERROR', payload:error})
                
                    break;
            }
        });
    }
}

export function signOut(){
    return (dispatch) => {
    dispatch({type: 'SIGN_OUT', payload:null})
    firebase.auth().signOut()
        .catch(error =>{
            dispatch({type: 'SIGN_IN_ERROR', payload:error})
            
        })
    
    }
}

export function openLoginDialog(){
    return (dispatch) => {
        dispatch({type: 'OPEN_LOGIN_DIALOG', payload: null})
    }
}

export function closeLoginDialog(){
    return (dispatch) => {
        dispatch({type: 'CLOSE_LOGIN_DIALOG', payload: null})
    }
}

function _setBookIfNonExists(bookId){
    
    return  new Promise((resolve, reject) =>{
        const bookRef = firebase.firestore().doc(`/book/${bookId}`)
        
        return bookRef.get()
                .then((bookDoc) => {
                    const exists = bookDoc.exists
                    if((exists) ? bookDoc.data().title : false){
                        console.log('book exists')
                        resolve('SAVED_DATA')
                    }
                    return fetchGoogleBook(bookId)
                        .then((response) => {
                            console.log('response', response)
                            
                            const vol = (response.volumeInfo) ? response.volumeInfo : {}
                            let description = (vol.description) ? vol.description : ''
                            description = description.replace('<p>', '').replace('</p>', '')  //striping html should happen server side
                            return {
                                authors: (vol.authors) ? vol.authors : [],
                                categories: (vol.categories) ? vol.categories : [],
                                description: description,
                                imageLinks: (vol.imageLinks) ? vol.imageLinks : null,
                                pageCount: (vol.pageCount) ? vol.pageCount : null,
                                previewLink: (vol.previewLink) ? vol.previewLink : null,
                                publishedDate: (vol.publishedDate) ? vol.publishedDate : null,
                                publisher: (vol.publisher) ? vol.publisher : null,
                                title: (vol.title) ? vol.title : null,
                                bookId: (response.id) ? response.id : null,
                            }
                })
                .then((book) =>{

                    if(exists){
                        bookRef.update(book)
                    }else{
                        bookRef.set(book)
                    }
                    resolve(book)
                    return 
                })
                
                .catch((error) =>{
                    console.log(error)
                    reject('SAVED_BOOK_META_DATA_ERROR')
                     
                })
            })
        })

}

function fetchGoogleBook(bookId){
    return  new Promise((resolve, reject) =>{
        const url = `https://www.googleapis.com/books/v1/volumes/${bookId}`
        const cors = _createCORSRequest('GET', url)
        
        if (!cors) {
            reject({errorType:'BROWSER_ERROR', errorMessage: 'This browser does not support search'})
            return
        }
        
        cors.onload = () => {
            resolve((cors.responseText) ? JSON.parse(cors.responseText) : {})
            return
        }
        
        cors.onerror = () => {
            reject({errorType:'There was an error searching for this book.'})
            return
        }
        
        cors.send()
    })

}


function _createCORSRequest(method, url) {
    let request = new XMLHttpRequest()
    if ("withCredentials" in request) {
        request.open(method, url, true)
    } else if (typeof XDomainRequest !== "undefined") {
        request = new XDomainRequest()
        request.open(method, url)
    } else {
        request = null
    }
    return request
  }


    

