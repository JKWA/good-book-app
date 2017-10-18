


const initialState = {
    error: null,
    displayName: '',
    email:'',
    initialLogin: null,
    saving: false,
    uid:null,
    startSignIn:false,
    signedIn:false,
    book:{},
    favoriteBooks:{},
    openLoginDialog:false,
    loginAccountError:null,
    loginPasswordError:null,
  }


  export default function reducer (state=initialState, action) {
  switch (action.type) {
    

    case "SAVING_DATA": {
      return {
        ...state, 
        saving: true,
      }

    }
    case "SAVED_DATA": {
      return {
        ...state, 
        saving: false,
      }
   
    }

    case "SAVE_ERROR": {
      return {
        ...state, 
        saving: false,
        error: action.payload,
      }
   
    }

    case "SIGN_OUT": {
      return {
        ...state,
        displayName: null,
        email: null, 
        book:{},
        favoriteBooks:{},
        initialLogin: null,
        signedIn: false,
        error: null,
        uid: null,
        loginAccountError: null,
        loginEmailError: action.payload,
        loginPasswordError: null,
      }
    
    }

    case "SIGN_IN": {
      return {
        ...state, 
        uid: action.payload,
        openLoginDialog: false,
      }
    
    }

    case "INITIATE_LOGIN": {
      return {
        ...state, 
        startSignIn: true,
      }
  
    }

    case "OPEN_LOGIN_DIALOG": {
      return {
        ...state,
        openLoginDialog: true,
      }

    }
    case "CLOSE_LOGIN_DIALOG": {
      return {
        ...state,
        openLoginDialog: false,
      }
 
    }

    case "UPDATE_USER_DATA": {
      return {
        ...state,
        displayName: action.payload.displayName,
        email: action.payload.email, 
        initialLogin: action.payload.initialLogin,
        signedIn: true,
      }

    }

    case "LOGIN_ACCOUNT_ERROR": {
      return {
        ...state,
        displayName: null,
        email: null, 
        initialLogin: null,
        signedIn: false,
        uid: null,
        loginAccountError: action.payload,
        loginEmailError: null,
        loginPasswordError: null,
      }
 
    }

    case "LOGIN_EMAIL_ERROR": {
      return {
        ...state,
        displayName: null,
        email: null, 
        initialLogin: null,
        signedIn: false,
        uid: null,
        loginAccountError: null,
        loginEmailError: action.payload,
        loginPasswordError: null,
      }
   
    }

    case "LOGIN_PASSWORD_ERROR": {
      return {
        ...state,
        displayName: null,
        email: null, 
        initialLogin: null,
        signedIn: false,
        uid: null,
        loginAccountError: null,
        loginEmailError: null,
        loginPasswordError: action.payload,
      }
  
    }
    
    case "ADD_USER_BOOK_RATING": {
      const book = {}
        book[action.payload.id] = Object.assign({}, action.payload.details)
    
      return {
        ...state,
        book: Object.assign({}, state.book, book),
      }
    
    }

    case "MODIFY_USER_BOOK_RATING": {
      const book = {}
        book[action.payload.id] = Object.assign({}, action.payload.details)
    
      return {
        ...state,
        book: Object.assign({}, state.book, book),
      }
    
    }

    case "ADD_USER_FAVORITE_BOOK_DETAIL": {
      const currentBook = state.favoriteBooks[action.payload.id]
      const newBook = {}
      newBook[action.payload.id] = Object.assign({}, currentBook, action.payload.details)

      return {
        ...state,
        favoriteBooks: Object.assign({}, state.favoriteBooks, newBook),
      }
   
    }


    case "REMOVE_USER_FAVORITE_BOOK_DETAIL": {
      let bookCopy = Object.assign({}, state.favoriteBooks)
      delete bookCopy[action.payload]
      
      return {
        ...state,
        favoriteBooks: bookCopy,
      }
   
    } 

    default:{
      return state
    }
  }
  
}














