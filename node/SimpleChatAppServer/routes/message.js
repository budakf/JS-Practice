var express = require('express');
var router = express.Router();
var firebaseDB = require('../Firebase/firebaseDbConnection')


router.post('/send', function(req, res, next){
    try{
        const messageContent = req.body.message 
        const message = {
            messageDBId: messageContent.messageDBId,
            messageID: Date.now(),
            from: messageContent.from,
            to: messageContent.to,
            content: messageContent.content,
            shown: "both",
        }

        firebaseDB.firebase.database().ref('messages/' + message.messageDBId + '/' + message.messageID ).set({
            from: message.from,
            to: message.to,
            content: message.content,
            shown: message.shown,
        }).then( function() {
            console.log("success")
            res.json( {success: "success"} )
        })
        
    }catch(error){
        console.log(error)
        res.json({error: "error",error})
    }

});



module.exports = router;

