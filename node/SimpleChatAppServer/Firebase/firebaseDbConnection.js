const admin = require('firebase-admin')

const serviceAccount = require('./service-account-key.json')
const fs = require('fs')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
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
        console.log(user)
        let users = db.collection('users')
        users.doc(user.username).set({
            "name": user.name, 
            "registrationDate":{ 
                "_seconds":1592686800,
                "_nanoseconds":0
            },
            "surname":user.surname
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


