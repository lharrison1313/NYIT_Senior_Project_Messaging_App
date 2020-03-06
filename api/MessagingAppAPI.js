import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export function login(email, password){
    auth().signInWithEmailAndPassword(email,password)
    .then((value) => console.log(value))
}

export function signUp(email, password, userName){
    auth().createUserWithEmailAndPassword(email, password)
    .then((userInfo)=>{
        console.log(userInfo)
        //adding user to user collection
        firestore().collection("Users").doc(userInfo.user.uid).set({
            UserName: userName
        }).then(function() {
            console.log("User added to database");
        })
        .catch(function(error) {
            console.error("Error adding user to database: ", error);
        });
    })
}

export function subscribeToAuthChanges(authStateChanged){
    auth().onAuthStateChanged((user) => {
        console.log(user)
        authStateChanged(user)
    })

}

export function signOut(onSignedOut){
    auth().signOut()
    .then(()=>{
        console.log('Signed Out')
        onSignedOut();
    })
}

//sends messages to group on database
export function sendMessage(groupID, message, senderName, senderID){

    firestore().collection("Groups").doc(groupID).collection("Messages").add({
        SenderName: senderName,
        SenderID: senderID,
        MessageText: message,
        TimeStamp: firestore.FieldValue.serverTimestamp()
    })
    .then(function(docRef) {
        console.log("Message sent with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error sending message: ", error);
    });
}

//creates a new group on database
export function createGroup(groupName,interests,locationName,coordinates){
    //prepending hash tags to interests
    var interestList = []
    interests.forEach( element =>{
        var hash = "#"
        interestList.push(hash.concat(element))
    })
    
    //creating new group
    firestore().collection("Groups").add({
        GroupName: groupName,
        Date: "2/19/2020",
        Interests: interestList,
        Location: locationName,
        Coordinates: coordinates,
        GroupOwner: getCurrentUserID(),
    })
    .then(function(docRef) {
        //adding group to users group collection
        firestore().collection("Users").doc(getCurrentUserID()).collection("Groups").add({
            Owner: true,
            GroupID: docRef.id
        }).then(function(){
            console.log("Group Added to user's groups")
        }).catch(function(error){
            console.error("Error addigng group to user's groups: ", error);
        })
        console.log("Group Created with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error creating group: ", error);
    });
}

//gets the current users id
export function getCurrentUserID(){
    return auth().currentUser.uid;
}

//gets any users public info
export async function getUserInfo(uid,userInfoRetrieved){
    var document = await firestore().collection("Users").doc(uid).get()
    userInfoRetrieved(document.data())
}

//gets all groups from database
export async function getAllGroups(groupsRetrieved,filter){
    if(filter == null){
        //given no filter get all groups in database
        var ref = firestore().collection("Groups").orderBy("GroupName")
    }
    else{
        //filter by interest
        var ref = firestore().collection("Groups").where("Interests","array-contains",filter).orderBy("GroupName")
    }

    return ref.onSnapshot((querrySnapshot) => {
        const groups = []
        if(querrySnapshot !== null){
            querrySnapshot.forEach((doc) =>{
                groups.push({
                    GroupName: doc.data().GroupName,
                    Date: doc.data().Date,
                    Location: doc.data().Location,
                    Coordinates: doc.data().Coordinates,
                    Interests: doc.data().Interests,
                    id: doc.id
                });
            });
            groupsRetrieved(groups);
        }
    })
}

//given a group id, gets all messages from that group
export async function getGroupMessages(gid,messagesRetrieved){
    var ref = firestore().collection("Groups").doc(gid).collection("Messages").orderBy("TimeStamp")
    return ref.onSnapshot((querrySnapshot) => {
        const messages = []
        querrySnapshot.forEach((doc) =>{
            messages.push({
                SenderName: doc.data().SenderName,
                MessageText: doc.data().MessageText,
                SenderID: doc.data().SenderID,
                GroupID: doc.id
            });
        });
        messagesRetrieved(messages)
    })
}