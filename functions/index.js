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