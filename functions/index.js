const functions = require('firebase-functions');
const admin = require("firebase-admin");
admin.initializeApp();


exports.updateVoteTally = functions.firestore
    .document('Groups/{Group}/Votes/{Vote}')
    .onUpdate((change,context) => {
        
        
        const gid  = context.params.Group
        const oldVote = change.before.data().vote
        const newVote = change.after.data().vote
        const ref = admin.firestore().collection("Groups").doc(gid)
        var vote = 0

        if((oldVote == 1 && newVote == -1)||(oldVote == -1 && newVote == 1)){
            vote = newVote*2
        }
        else if((oldVote == 1 && newVote == 0)||(oldVote == -1 && newVote == 0 )){
            vote = oldVote*-1
        }
        else if((oldVote == 0 && newVote == 1)||(oldVote == 0) && (newVote == -1)){
            vote = newVote
        }

        ref.update({
            Votes: admin.firestore.FieldValue.increment(vote)
        })

        return true
    })

exports.initializeVoteTally = functions.firestore
    .document('Groups/{Group}/Votes/{Vote}')
    .onCreate((snap,context) => {
        const vote = snap.data().vote
        const gid = context.params.Group
        const ref = admin.firestore().collection("Groups").doc(gid)

        ref.update({
            Votes: admin.firestore.FieldValue.increment(vote)
        })

        return true

    })

exports.sendNotificationToGroup = functions.firestore
    //listening for updates in messages collection
    .document('Groups/{Group}/Messages/{Message}')
    .onCreate((snap,context) => {
        //getting group data
        const gid = context.params.Group
        const body = snap.data().MessageText
        const sender = snap.data().SenderName
        //building notification
        const message = {
            data: {
                type: "message",
                gid: gid
            },
            notification:{
                body: body,
                title: sender,
            },
            topic: gid
        }
        //sending message notification
        admin.messaging().send(message)
        .then(response => {
        console.log('Successfully sent message:', response);
        })
        .catch(error => {
        console.log('Error sending message:', error);
        }); 
    })

exports.sendGroupInterestNotification = functions.firestore
    .document("Groups/{Group}")
    .onCreate((snap,context) =>{
        //remember group hashtags must be removed and replaced with
        const interests = snap.data().Interests;
        const gid = context.params.Group;
        const name = snap.data().GroupName;
        const description = snap.data().Description;
        const private = snap.data().Private
        const location = snap.data().Location;
        
        if(!private){
            //sending message to each group interest
            interests.forEach((element) => {
                var body = "A group matching your interest " + element + " has been created.";

                var message = {
                    data: {
                        type: "group",
                        gid: gid,
                        name: name,
                        description: description,
                        location: location
                    },
                    notification:{
                        body: body,
                        title: "Check out this group!",
                    },
                    topic: "_"+element.substring(1)
                }

                admin.messaging().send(message).then(response => {
                    console.log('Successfully sent message:', response);
                })
                .catch(error => {
                    console.log('Error sending message:', error);
                }); 
            });
        }
        
    })