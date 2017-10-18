Good Book is an app to try things out.  It was bootstrapped from create-react-app

[Try Good Book] (https://book-fly.firebaseapp.com/)


## Table of Contents

- [React 16.0 Beta](#react-16.0-Beta)
- [Create React App](#create-react-app)
- [Redux 3.5](#redux-3.5)
- [Material UI 1.0 Beta](#material-ui-1.0-beta)
- [Firebase Firestore Beta](#firebase-firestore-beta)
- [Firebase Functions Beta](#firebase-functions-beta)
- [ES6](#es6)


## React 16.0 Beta

Why am I thinking about moving to React?

* React with Redux is clearly gaining steam
* Changes in browsers, particularly ES6 modules seem to fit with React better than other frameworks
* It's exclusively javascript, which is interesting


### Lessons Learned
* Easy to learn
* Large active community
* Clear documented opinions (do this, not that).
* Helpful error messages
* Typechecking is easy and convenient
* Typechecking doesn't throw errors for testing 
* No built-in way to trigger an action only when the component is mounted the first time.
* Component error-handling is helpful, including setting error boundaries.
* Best to avoid decorators, they don't solve a difficult problem yet add fragility.

## Create React App
create-react-app is a great way to get something started

### Lessons Learned
  * Hot reloading saves time and keystrokes
  * ES6 support
  * Testing setup 
    * There is a conflict when adding firebase functions folder.  
```json
"scripts": {
    "test": "CI=true react-scripts test --env=jsdom --coverage --collectCoverageFrom=src/**/*js --collectCoverageFrom=!functions",
  },
```
    * Testing is easier then other strategies I've used, but still a challenge.
  * build tool is great
  * eject is possible, but would need to build a really good case first


## Redux 3.5
After lots of challenges with debugging asynchronous applications I was particularly interested in testing Redux

### Lessons Learned
* Redux has a bit of boilerplate, which might be overkill for simple apps.
* Although it is easy to save all state changes in Redux, it sometimes makes sense to save changes within a component's local state, such as real-time input validating.
* A side effect of Redux is that it simplifies React Components
* It is easy to refactor and debug, particularly helpful is 
```javascript
store.subscribe(() => { 
    console.log("store changed", store.getState());
  })
```
* Breaking up reducers is a good way organize things, the tradeoff is that it limits what part of the state can be updated (such updating a general progress bar).
* Create folders for actions and reducers 
* Return functions when creating an action
```javascript 
export function openDrawer (){
    return (dispatch) => {
        dispatch({type: 'OPEN_DRAWER', payload: true})
    }
}
```


## Material UI 1.0 Beta
This was a good opportunity try new strategies for handling CSS. 


## Firebase Firestore Beta
I have experience with NoSql, but I wish

* data structures didn't need to focus so much on the limitations of the platform (flat)
* refactoring was easier (easy to get locked into early decisions)
* it was not so easy to accidentally create large numbers of listeners
* queries were more powerful.

I also wanted to test how to use a realtime database works with Redux, particularly if they overlapped to the point where they were mostly duplicating each other's functions.

### Lessons Learned
* Issues with data structures are somewhat improved, particularly when it comes to nesting data.
* Querying is a bit more robust, but it is still important to consider the limitations when designing data structures.
* Firestore has good documentation and lots of options for handling listeners.
* Embed real-time data in a React component, as it is easier to track and unsubscribe listeners.  
* Location of real-time listeners within the app are important to consider-
  * Placing listeners on a page mounts the listeners only when page is in view, and they will need to be removed when the page us unmounted.  This causes downloading of fresh data each time and some latency when initially viewing the page (cache data in Redux to avoid latency when returning).  Use for infrequently viewed pages that still need real-time updates.
  * Placing the listeners above the router means that data is pulled down when the app is loaded, regardless of whether the data will be viewed. Use for frequently accessed data and but consider of the overall size and number of listeners.
* Deleting collections and documents is a bit more complicated
* Updating data is only possible if the document exists, so best to call ```get()``` before updating to check if the document exists ```(doc.exists) ? db.update(data) : db.set(data)```. 

## Firebase Functions Beta
I've been using Firebase's server-side functions from it's initial release, including:

* Processing images (creating thumbnails and screening for inappropriate content)
* Processing data, such as copying information to be close to nodes 
* Sanitizing content uploaded by users 
* Adding/deleting users 
* Processing credit card transactions (Stripe)
* Creating APIs and responding to webhooks 
* Logging Errors  
* Set GEO data

I wanted to test Functions with Firestore, including:

* Responding to Firestore data changes
* Using Firestore's aggregation queries to maintain aggregate information across documents. 

### Lessons Learned

*  Firebase Functions can to be difficult to test and maintain. It is possible to run locally, but it still takes too long to get a function written or refactored.
* Firebase Functions are still in Beta, and may not quite yet be dependable enough to run important functions 


## ES6
I wanted to more use of ES6, including:

* imports
```javascript
import Favorite from './Favorite'
```

* promises
```javascript
    const promise = new Promise((resolve, reject) => {
if (true) {
    resolve()
  }
  else {
    reject(Error())
  }
})
```

* arrow functions 
```javascript
  () => {
   return 
}
```

* conditional operators 
```javascript
  condition ? expr1 : expr2 
```
