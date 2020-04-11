import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
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

export function resetPassword(email,alert){
    auth().sendPasswordResetEmail(email)
            .then(() => {
                alert(true,"Password reset email has been sent.");
            }, (error) => {
                alert(false,error.message);
            });
}

export function resetEmail(email, alert){
    auth().currentUser.updateEmail(email)
        .then(() => {
            alert(true, "Email was successfully changed!")
        }, (error) => {
            alert(false,error.message);
        });
}

//registers the app with firebase cloucd messaging 
export async function registerAppWithFCM(){
    await messaging().registerDeviceForRemoteMessages();
}

//request ios permission for recieving push notifications
export async function requestUserPermission() {
    const settings = await messaging().requestPermission();
  
    if (settings) {
      console.log('Permission settings:', settings);
    }
  }

//sends messages to group on database
export function sendMessage(groupID, body, senderName, senderID){

    firestore().collection("Groups").doc(groupID).collection("Messages").add({
        SenderName: senderName,
        SenderID: senderID,
        MessageText: body,
        TimeStamp: firestore.FieldValue.serverTimestamp()
    })
    .then(function(docRef) {
                
    })
    .catch(function(error) {
        console.error("Error sending message: ", error);
    });
}

//adds a specific user to a specific group
export function addUserToGroup(uid,gid){
    
    var ref = firestore().collection("Groups").doc(gid)
    ref.get().then((doc) =>{
        var users = doc.data().GroupUsers
        if(!users.includes(uid)){
            firestore().collection("Groups").doc(gid).update({
                GroupUsers: firestore.FieldValue.arrayUnion(uid)
            })
            messaging().subscribeToTopic(gid).then(()=>console.log("subscribed to group notifications for group: " + gid))
        }
        console.log("Done")
            
    })
    .catch((error) =>{console.log("error adding user to group", error)})
}

//removes a specific user from a specific group
//input: uid = user id, gid = group id 
export function removeUserFromGroup(uid,gid){
    var ref = firestore().collection("Groups").doc(gid)
    ref.get().then((doc) =>{
        var users = doc.data().GroupUsers
        if(users.includes(uid)){
            firestore().collection("Groups").doc(gid).update({
                GroupUsers: firestore.FieldValue.arrayRemove(uid)
            })
            messaging().unsubscribeFromTopic(gid).then(()=>console.log("unsubscribed to group notifications for group: " + gid))
        }
        console.log("Done")
            
    })
    .catch((error) =>{console.log("error deletting user to group", error)})

}

//deletes a group from the database
//input: uid = user id, gid = group id
export function deleteGroup(gid,uid){
    var ref = firestore().collection("Groups").doc(gid)
    ref.get().then((doc)=>{
        var owner = doc.data().GroupOwner
        if(owner==uid){
            ref.delete()
            messaging().subscribeToTopic(gid).then(()=>console.log("subscribed to group notifications for group: " + gid))
        }
    })
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
        TimeStamp: firestore.FieldValue.serverTimestamp(),
        Interests: interestList,
        Location: locationName,
        Coordinates: coordinates,
        GroupOwner: getCurrentUserID(),
        GroupUsers: [getCurrentUserID()],
        Votes: 0
    }).then((info)=>{
        messaging().subscribeToTopic(info.id).then(()=>console.log("subscribed to group notifications for group: " + info.id))
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
                
                var date = Date(doc.data().TimeStamp)
                //removing certain date info
                var dateArray = date.toString().split(" ")
                dateArray.pop()
                dateArray.pop()
                dateArray.pop()
                var dateString = dateArray.join(" ")

                groups.push({
                    GroupName: doc.data().GroupName,
                    Date: dateString,
                    Location: doc.data().Location,
                    Coordinates: doc.data().Coordinates,
                    Interests: doc.data().Interests,
                    id: doc.id,
                    index: index,
                    Votes: doc.data().Votes,
                    GroupUsers: doc.data().GroupUsers,
                    GroupOwner: doc.data().GroupOwner
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

                var date = Date(doc.data().TimeStamp)
                //removing certain date info
                var dateArray = date.toString().split(" ")
                dateArray.pop()
                dateArray.pop()
                dateArray.pop()
                var dateString = dateArray.join(" ")

                groups.push({
                    GroupName: doc.data().GroupName,
                    Date: dateString,
                    Location: doc.data().Location,
                    Coordinates: doc.data().Coordinates,
                    Interests: doc.data().Interests,
                    id: doc.id,
                    index: index,
                    Votes: doc.data().Votes,
                    GroupUsers: doc.data().GroupUsers,
                    GroupOwner: doc.data().GroupOwner
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

// adds a like or a dislike to the current group
// inputs gid = group id, like = if true adds 1 to database if false adds -1
export function addLikeDislike(gid,like){
    var ref = firestore().collection("Groups").doc(gid).collection("Votes").doc(getCurrentUserID())

    ref.get().then((snapshot) => {

        var vote = 0
        if(like){
            vote = 1
        }
        else{
            vote = -1
        }

        if(snapshot.exists){
            //if the vote is pressed twice in the same direction it is set to 0
            var currentVote = snapshot.data().vote
            if(currentVote == vote){
                vote = 0
            }

            ref.update({
                vote: vote
            })
        }
        else{
            //if no vote exists for that user than a new vote is created
            var newRef = firestore().collection("Groups").doc(gid).collection("Votes").doc(getCurrentUserID())
            newRef.set({
                vote: vote
            })
        }

    })
    .catch((error) => {console.log(error)})       
}


