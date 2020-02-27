import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export function login(email, password){
    auth().signInWithEmailAndPassword(email,password)
    .then((value) => console.log(value))
}

export function signUp(email, password, userName){
    // this connects with the fire base
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
export function createGroup(groupName,interests){

    firestore().collection("Groups").add({
        GroupName: groupName,
        Date: "2/19/2020",
        Interests: interests,
        Location: "Manhattan",
        GroupOwner: getCurrentUserID(),
    })
    .then(function(docRef) {
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

