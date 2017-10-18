const functions = require('firebase-functions'),
      admin = require('firebase-admin'),
      https = require('https')

admin.initializeApp(functions.config().firebase);


exports.createNewUser = functions.auth.user().onCreate(function(event) {

const data = event.data
const uid = data.uid

return admin.firestore().doc(`/user/${uid}`)
.set({
      displayName: (data.displayName) ? data.displayName : null,
      email: (data.email) ? data.email : null,
      emailVerified: (data.emailVerified) ? data.emailVerified : false,
      initialLogin: (Date.now())
  }
)
.then( () => {
  console.log('SAVED_INITIAL_USER');
})
.catch( error =>{
  console.log('SAVED_INITIAL_USER_ERROR', error);
})


})

exports.updateUserFavoriteData = functions.firestore
.document('user/{user_id}/book/{book_id}')
.onWrite((event) => {

  const book_id = event.params.book_id,
        user_id = event.params.user_id,
        data = event.data.data(),
        bookRef = admin.firestore().doc(`book/${book_id}/user/${user_id}`)
      
    if(Object.keys(data).length === 0){
       return bookRef.delete()
       .then(() => {
          console.log('DATA_DELETED')
       })
       .catch((error) =>{
        console.log('DATA_DELETED_ERROR', error)
       })
    }

    return bookRef.set(data)
      .then(() => {
        console.log('DATA_UPDATED')
      })
      .catch((error) =>{
        console.log('DATA_UPDATED_ERROR', error)
      })

   
})


exports.updateRatingTotals = functions.firestore
  .document('book/{book_id}/user/{user_id}')
  .onWrite((event) => {
    const book_id = event.params.book_id,
          user_id = event.params.user_id,
          data = event.data.data()
    
    return admin.firestore()
      .collection('book').doc(book_id).collection('user')
      .get()
      .then((result) =>{
        let favorite=0, like=0, dislike=0
        
        if(result.empty){
        return
        }

        result.forEach((user) =>{
        
        const userRating = (user.exists) ? user.data() : {}
      
        if(userRating.favorite) favorite ++
        if(userRating.like === 'yes') like++
        if(userRating.like === 'no') dislike++
        
        })
        const rating = {favorite, like, dislike, totalRating:result.size, percentLike:like/result.size}
        admin.firestore().collection('book').doc(book_id)
        .update(rating)
      })
      .catch((error) =>{
        console.log('ERROR_SAVING_RATING_UPDATE', error)
      })

    })




