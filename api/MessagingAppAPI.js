import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export function login(email, password){
    auth().signInWithEmailAndPassword(email,password)
    .then((value) => console.log(value))
}

export function signUp(email, password, displayName){
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


export async function getGroups(){
    const query = await firestore().collection("Groups")
    .doc("TgWZj8pnBOTnIBWHaNUg")
    .get();

    console.log("Group Data",query.data())
    
}