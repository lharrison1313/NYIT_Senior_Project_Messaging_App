import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {PermissionsAndroid} from 'react-native';

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

export function signOut(){
    auth().signOut()
    .then(()=>{
        console.log('Signed Out')
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

export function addUserToGroup(uid,gid){
    
    var ref = firestore().collection("Groups").doc(gid)
    ref.get().then((doc) =>{
        var users = doc.data().GroupUsers
        if(!users.includes(uid)){
            firestore().collection("Groups").doc(gid).update({
                GroupUsers: firestore.FieldValue.arrayUnion(uid)
            })
        }
        console.log("Done")
            
    })
    .catch((error) =>{console.log("error adding user to group", error)})
}

//creates a new group on database
export function createGroup(groupName,interests,locationName,coordinates){
    if(locationName == null){
        locationName = "Anywhere"
    }
    
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
        GroupUsers: [getCurrentUserID()]
    }).then((info)=>{
        firestore().collection("Users").doc(getCurrentUserID()).collection("Groups").add({
            GroupID: info.id,
            GroupOwner: true
        })
    })
    .catch((error)=>{
        console.log(error)
    })

    
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

//gets the groups the user is in
export async function getCurrentUserGroups(groupsRetrieved,filter){

    if(filter == null){
        //given no filter get all groups in database
        var ref = firestore().collection("Groups").where("GroupUsers","array-contains",getCurrentUserID())
    }
    else{
        //filter by group name
        var ref = firestore().collection("Groups").where("GroupUsers","array-contains",getCurrentUserID()).where("GroupName","==",filter).orderBy("GroupName")
    }

    return ref.onSnapshot((querySnapshot) => {
        const groups = []
        if(querySnapshot !== null){
            var index = 0;
            querySnapshot.forEach((doc) =>{
                
                groups.push({
                    GroupName: doc.data().GroupName,
                    Date: doc.data().Date,
                    Location: doc.data().Location,
                    Coordinates: doc.data().Coordinates,
                    Interests: doc.data().Interests,
                    id: doc.id,
                    index: index
                   
                });
                //removing indices of global groups
                if(doc.data().Coordinates != null){
                    index++
                }
                
                
            });
            groupsRetrieved(groups);
        }
    })
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

    return ref.onSnapshot((querySnapshot) => {
        const groups = []
        if(querySnapshot !== null){
            var index = 0;
            querySnapshot.forEach((doc) =>{
                groups.push({
                    GroupName: doc.data().GroupName,
                    Date: doc.data().Date,
                    Location: doc.data().Location,
                    Coordinates: doc.data().Coordinates,
                    Interests: doc.data().Interests,
                    id: doc.id,
                    index: index
                });
                //removing indices of global groups
                if(doc.data().Coordinates != null){
                    index++
                }
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


//requests location permission
export async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permissions',
          message:
            'This App needs access to your location' +
            'so we can see nearby groups.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location Permission Granted');
      } else {
        console.log('Location Permission Denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }