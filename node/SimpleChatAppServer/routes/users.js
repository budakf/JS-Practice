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


router.post('/add', async function(req, res, next) {
    try{
        console.log(req.body)
        console.log(req.body.user)
        const user = req.body.user
        await firebaseDB.addUserToDB(user)
        res.json({success:"Success"})
    }
    catch(error){
        res.json({error:"Error"})
    }

});

module.exports = router;
