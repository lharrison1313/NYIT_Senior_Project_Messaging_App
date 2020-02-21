import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export function login(email, password){
    auth().signInWithEmailAndPassword(email,password)
    .then((value) => console.log(value))
}

export function signUp(email, password, displayName){
    // this connects with the fire base
    auth().createUserWithEmailAndPassword(email, password)
    .then((userInfo)=>{
        console.log(userInfo)
        userInfo.user.updateProfile({displayName: displayName.trim()})
        .then(() => {})
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

export function sendMessage(groupID, message, sender){
    firestore().collection("Groups").doc(groupID).collection("Messages").add({
        SenderName: sender,
        MessageText: message,
        TimeStamp: firestore.FieldValue.serverTimestamp()
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

