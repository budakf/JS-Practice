var express = require('express');
var router = express.Router();
var firebaseDB = require('../Firebase/firebaseDbConnection')



router.get('/', async function(req, res, next) {
  try{
        firebaseDB.getUsers().then( function(querySnapshot){

          const fireBaseUsers = []
          querySnapshot.forEach( function(doc) {
              fireBaseUsers.push({
                  [ doc.id ] : doc.data()
              })
          }) 
          res.json( fireBaseUsers )

      })  
  }catch(error){
      res.json({error:error})
  }

});


router.get('/:email', async function(req, res, next) {
  try{
      const email = req.params.email 
      firebaseDB.getUser(email).then( ( user ) => {
        res.json( user.data() )
      })
  }
  catch(error){
      res.json({error:error})
  }

});


router.post('/addUser', async function(req, res, next) {
    try{
        const user = {
            username : "username",
            "registrationDate":{
                "_seconds":1592686434,
                "_nanoseconds":0
            },
            name: "John",
            surname: "Doe",
        }
        await firebaseDB.addUserToDB(user)
        res.json({success:"Success"})

    }
    catch(error){
        res.json({error:"Error"})

    }

});

module.exports = router;
