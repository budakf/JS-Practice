const admin = require('firebase-admin')
const firebase = require('firebase')
const serviceAccount = require('./service-account-key.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: ""
})

firebase.initializeApp({
    apiKey: '',
    databaseURL: ""
})

const db = admin.firestore();

const getUsers = async () =>{

    try{
        let users = db.collectionGroup('users')
        return await users.get()
    
    }
    catch(error){
        console.log(error);
    }

}

const getUser = async (username) => {

    try{ 
        const document = db.doc("users/"+username)
        return await document.get()
    }
    catch(error){
        console.log(error);
    }

}

const addUserToDB = async (user) => {

    try{ 
        let users = db.collection('users')
        users.doc(user.email).set({
            "name": user.name, 
            "uid": user.uid,
            "email": user.email,
            "surname": user.surname,
            "friends":[],
        })

    }
    catch(error){
        console.log(error);
    }

}

const createUserForAuth = async (user) => {

    try{ 
        console.log(user)
        return await auth.createUser({
            email: user.email,
            emailVerified: false,
            password: user.password,
            displayName: user.displayName,
            photoURL: user.photoURL,
            disabled: false
        })
    }
    catch(error){
        return new Promise(error)
    }

}


exports.getUsers = getUsers;
exports.getUser = getUser;
exports.addUserToDB = addUserToDB;
exports.createUserForAuth = createUserForAuth;
exports.firebase = firebase;


