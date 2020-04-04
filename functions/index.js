const functions = require('firebase-functions');
const admin = require("firebase-admin");
admin.initializeApp();

exports.updateVoteTally = functions.firestore
    .document('Groups/{Group}/Votes/{Vote}')
    .onUpdate((change,context) => {
        
        
        const gid = change.before.data().gid
        const oldVote = change.before.data().vote
        const newVote = change.after.data().vote
        const ref = admin.firestore().collection("Groups").doc(gid)
        var update = false

        if(oldVote == -1 && newVote == 1){
            ref.update({
                Votes: admin.firestore.FieldValue.increment(2)
            })
            update = true
        }
        else if(oldVote == 1 && newVote == -1){
            ref.update({
                Votes: admin.firestore.FieldValue.increment(-2)
            })
            update = true
        }

        return update
    })

exports.initializeVoteTally = functions.firestore
    .document('Groups/{Group}/Votes/{Vote}')
    .onCreate((snap,context) => {
        const vote = snap.data().vote
        const gid = snap.data().gid
        const ref = admin.firestore().collection("Groups").doc(gid)

        ref.update({
            Votes: admin.firestore.FieldValue.increment(vote)
        })

        return true

    })