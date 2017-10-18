import { applyMiddleware, combineReducers, createStore } from "redux"
import logger from "redux-logger"
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"
import bookReducer from "./reducers/bookReducer"
import layoutReducer from "./reducers/layoutReducer"
import userReducer from "./reducers/userReducer"


  const reducers = combineReducers({
    book: bookReducer,
    layout: layoutReducer,
    user: userReducer,
  })

  
  const middleware = applyMiddleware (promise(), thunk, logger())
  const store = createStore(reducers, middleware)
  //   store.subscribe(() => { 
  //   console.log("store changed", store.getState())
  // })

  


  export default store
