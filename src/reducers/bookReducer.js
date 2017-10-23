

const initialState = {
    fetching: false,
    fetched: false,
    fetchError: null,
    query: '',
    queryError:null,
    searchBooks: {},
    highestRatedBooks:{},
    totalItems:0,
    nextIndex:11,
    hasMore:true,
  }


  export default function reducer (state=initialState, action) {
  switch (action.type) {
    case "FETCH_BOOKS_PENDING": {
      return {
        ...state, 
        fetchError:null,        
        fetching: true, 
        query:action.payload,
        nextIndex:11,
        totalItems:0,
        hasMore:true,
        searchBooks: {},
      }
    }
    case "FETCH_BOOKS_REJECTED": {
      return {
        ...state, 
        fetching: false, 
        fetchError: action.payload,
      }
    }
    case "FETCH_BOOKS_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        fetchError:null,
        searchBooks: action.payload,
        totalItems: action.payload.data.totalItems
      }
    }

    case "ADD_BOOKS_PENDING": {
        return {
            ...state,
            fetchError:null,
            fetching: true,
            nextIndex: state.nextIndex+10,
            hasMore: (state.nextIndex <= 51) ? true :false,
            // startIndex: action.payload
        }
      }

      case "SET_TOTAL_BOOK": {
        return {
            ...state,
            fetchError:null,
            fetching: false,
            totalItems: action.payload,
        }
      }

      case "ADD_BOOK": {
        return {
            ...state,
            fetchError:null,
            fetching: false,
            searchBooks: Object.assign({}, state.searchBooks, action.payload),
        }
      }
      
    case "ADD_BOOKS_FULFILLED": {
        return {
          ...state,
          fetchError:null,
          fetching: false,
          fetched: true,
          books: state.book.concat(action.payload.data.items),
        }
      }

      case "BOOK_QUERY_ERROR": {
        return {
          ...state,
          queryError: action.payload,
          fetching: false,
          fetched: false,
          searchBooks: {},
        }
      }

      case "ERROR_MESSAGE_TIMEOUT": {
        return {
          ...state,
          queryError: null,
          fetching: false,
          fetched: false,
          fetchError: null,
        }
      }
      

      case "BOOK_QUERY_UPDATE": {
        return {
          ...state,
          query: action.payload,
          queryError:null,
          fetching: false,
          fetched: false,
          searchBooks: {},
        }
      }

      case "ADD_HIGH_RATED_BOOK": {
        const book = {}
        book[action.payload.id] = Object.assign({}, action.payload.details)
    
        return {
          ...state,
          highestRatedBooks: Object.assign({}, state.highestRatedBooks, book),
          
          
        }
      }

      
      


    default:{
      break
    }
  }
  return state
}














