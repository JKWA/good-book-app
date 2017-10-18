

const initialState = {
    openDrawer: false,
    dockedDrawer: true,
    error: null,
    route:'home',
    displaySize: {width:0, height:0, size:'phone'}
  }


  export default function reducer (state=initialState, action) {
  switch (action.type) {
    case "OPEN_DRAWER": {
      return {
        ...state, 
        openDrawer:true,
      }
    }
    case "CLOSE_DRAWER": {
      return {
        ...state, 
        openDrawer:false,
      }
    }
    case "TOGGLE_DRAWER": {
      return {
        ...state,
        openDrawer: !state.openDrawer,
      }
    }
    case "SET_ROUTE": {
      return {
        ...state,
        route: action.payload,
      }
    }

    case "SET_DISPLAY_SIZE": {
      return {
        ...state,
        displaySize: action.payload,
      }
    }

    default:{
      return state
    }
  }

}

