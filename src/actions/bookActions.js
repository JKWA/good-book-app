

export function fetchBooks(queryString){
    return (dispatch) => {
        dispatch({type: 'FETCH_BOOKS_PENDING', payload: queryString})
        fetchGoogleBooks(queryString, 0)
        .then(result =>{
            dispatch({type: 'ADD_BOOK', payload: result})
        })
        .catch(error => {
            console.log(error)
            dispatch({type:'FETCH_BOOKS_ERROR', payload:error})
        })
    }
}


export function addBooks(queryString, startIndex){
    return (dispatch) => {
        dispatch({type: 'ADD_BOOKS_PENDING', payload: queryString})
        fetchGoogleBooks(queryString, startIndex)
        .then(result =>{
            dispatch({type: 'ADD_BOOK', payload: result})
        })
        .catch(error => {
            console.log(error)
            dispatch({type:'FETCH_BOOKS_ERROR', payload:error})
        })
    }
} 


export function addHighRatedBook(id, details){
    return (dispatch) => {
        dispatch({type: 'ADD_HIGH_RATED_BOOK', payload:{id, details}})
    }
}

function fetchGoogleBooks(queryString, startIndex){
    return  new Promise((resolve, reject) =>{
        const url = `https://www.googleapis.com/books/v1/volumes?q=${queryString}&startIndex=${startIndex}&maxResults=10&printType=books`
        const cors = _createCORSRequest('GET', url)
        
        if (!cors) {
            reject({errorType:'BROWSER_ERROR', errorMessage: 'This browser does not support search'})
            return
        }
        
        cors.onload = () => {
            resolve(_parseBooks(cors))
            return
        }
        
        cors.onerror = (error) => {
            console.log(error)
            reject(error)
            return
        }
        
        cors.send()
    })

}


function _createCORSRequest(method, url) {
    let request = new XMLHttpRequest()
    // request.setRequestHeader()
    if ("withCredentials" in request) {
        request.open(method, url, true)
    } else if (typeof XDomainRequest !== "undefined") {
        request = new XDomainRequest()
        request.open(method, url)
    } else {
        request = null
    }
    console.log(request)
    return request
  }


  function _parseBooks(request){
    const response = (request.responseText) ? JSON.parse(request.responseText) : {}
    const books = response.items;
    const bookObj = {}

    for (let index in books){
        const book = books[index]
        const key = book.id
        bookObj[key] = book
    }
    return bookObj
  }
  
 


