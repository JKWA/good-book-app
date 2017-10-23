

export function fetchBooks(queryString, offline){
    return (dispatch) => {

        dispatch({type: 'FETCH_BOOKS_PENDING', payload: queryString})
        
        if(offline){
            dispatch({type:'FETCH_BOOKS_REJECTED', payload:{type:'OFFLINE_ERROR', message: 'You are offline'}})
            setTimeout(() => {
                dispatch({type:'ERROR_MESSAGE_TIMEOUT', payload:true})
            }, 5000)
            return 
        }

        fetchGoogleBooks(queryString, 0)
        .then(result =>{
            dispatch({type: 'ADD_BOOK', payload: result})
        })
        .catch(error => {
            console.log(error)
            dispatch({type:'FETCH_BOOKS_REJECTED', payload:error})
        })
    }
}


export function addBooks(queryString, startIndex, offline){
    return (dispatch) => {

        dispatch({type: 'ADD_BOOKS_PENDING', payload: queryString})        

        if(offline){
            dispatch({type:'FETCH_BOOKS_REJECTED', payload:{type:'OFFLINE_ERROR', message: 'You are offline'}})
            return 
        }

        fetchGoogleBooks(queryString, startIndex)
        .then(result =>{
            dispatch({type: 'ADD_BOOK', payload: result})
        })
        .catch(error => {
            console.log(error)
            dispatch({type:'FETCH_BOOKS_REJECTED', payload:error})
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
            reject({type:'BROWSER_ERROR', message: 'This browser does not support search'})
            return
        }
        
        cors.onload = () => {
            if(cors.status === 200){
              try{
                resolve(_parseBooks(cors))
                return 
              }catch(error){
                reject({type:'RESPONSE_PARSE_ERROR', message:`Google server error, please try again`})
                return
              }
              
            }
            reject({type:'SERVER_RESPONSE_ERROR', message:`Google server error (${cors.status}), please try again`})
            return
        }

        cors.ontimeout = () => {
            reject({type:'SERVER_TIMEOUT_ERROR', message:`Google server timed out, please try again`})
            return
        }
        
        cors.onerror = (error) => {
            console.log(error)
            reject({type:'SERVER_ERROR', message:'Request not completed'})
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


  
 


