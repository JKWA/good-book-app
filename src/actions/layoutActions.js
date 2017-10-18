

export function openDrawer (){
    return (dispatch) => {
        dispatch({type: 'OPEN_DRAWER', payload: true})
    }
}

export function closeDrawer(){
    return (dispatch) => {
        dispatch({type: 'CLOSE_DRAWER', payload: true})
    }
}

export function toggleDrawer(){
    return (dispatch) => {
        dispatch({type: 'TOGGLE_DRAWER', payload: true})
    }
}

export function setRoute(route){
    return (dispatch) => {
        dispatch({type: 'SET_ROUTE', payload: route})
    }
}

export function setDisplaySize(height, width){
    return (dispatch) => {
        const size = _parseSize(width, height)
        
        dispatch({type: 'SET_DISPLAY_SIZE', payload: {height: height, width:width, size:size}})
    }
}

function _parseSize(width, height){
    if(width <= 480){
        return 'phone'
    }
    if(width <= 768){
        return 'tablet'
    }
    if(width <= 1115){
        return 'laptop'
    }
    if(width <= 1824){
        return 'wide'
    }
   return 'phone'

}



