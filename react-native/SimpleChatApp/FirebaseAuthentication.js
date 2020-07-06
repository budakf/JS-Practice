
const firebase = require('firebase')
firebase.initializeApp({
    apiKey: "",
    databaseURL: ""
})

export const auth = firebase.auth()
export default firebase


