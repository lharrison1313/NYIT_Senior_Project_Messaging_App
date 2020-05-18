import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid} from 'react-native';

export function login(email, password, alert){
    auth().signInWithEmailAndPassword(email,password)
    .then((value) => console.log(value))
    .catch((error) =>{ 
        //displaying error dialog
        alert()
    })
}

// registers user account 
// inputs: email - the choosen user email, password - the choosen user password,  
// userName - the choosen username, alert - callback function to display error dialog 
export function signUp(email, password, userName, alert){
    auth().createUserWithEmailAndPassword(email, password)
    .then((userInfo)=>{
        console.log(userInfo)
        //adding user to user collection
        firestore().collection("Users").doc(userInfo.user.uid).set({
            UserName: userName,
            uid: userInfo.user.uid,
            Friends: [],
            Interests: []

        }).then(() => {
            //setting users display name
            auth().currentUser.updateProfile({displayName: userName})
            
        })
        .catch((error) => {
            // displaying error dialog
            alert(error)
        });
    }).catch((error) =>{
         // displaying error dialog
        alert(error)
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
//inputs: GroupID - id of group message is sent to, body - message text,
//senderName - senders user name, senderID - sender's user ID
export function sendMessage(groupID, body, senderName, senderID){

    firestore().collection("Groups").doc(groupID).collection("Messages").add({
        SenderName: senderName,
        SenderID: senderID,
        MessageText: body,
        TimeStamp: firestore.FieldValue.serverTimestamp()
    })
    .then(function(docRef) {
        console.log("Successfully sent message: " + body)
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
//input: uid - user id, gid - group id
export function deleteGroup(gid,uid){
    var ref = firestore().collection("Groups").doc(gid)
    ref.get().then((doc)=>{

        var owner = doc.data().GroupOwner

        //checking if user is owner
        if(owner==uid){
            //deleting group
            ref.delete()
            //unsubscribing from notifications for group
            messaging().unsubscribeFromTopic(gid).then(()=>
            console.log("unsubscribed to group notifications for group: " + gid)
            )
        }
    })
}

//creates a new group on database
//inputs: group - group POJO with the following fields: groupName, interests
//locationName, coordinates, description private, visible
export function createGroup(group){
    if(group.locationName == null){
        group.locationName = "Anywhere"
    }
    
    //prepending hash tags to interests
    var interestList = []
    group.interests.forEach( element =>{
        var hash = "#"
        interestList.push(hash.concat(element))
    })
    //creating new group
    firestore().collection("Groups").add({
        GroupName: group.groupName,
        TimeStamp: firestore.FieldValue.serverTimestamp(),
        Interests: interestList,
        Location: group.locationName,
        Coordinates: group.coordinates,
        GroupOwner: getCurrentUserID(),
        GroupUsers: [getCurrentUserID()],
        PendingGroupUsers: [],
        Votes: 0,
        Private: group.private,
        Visible: group.visible,
        Description: group.description
        
    }).then((info)=>{
        messaging().subscribeToTopic(info.id).then(()=>
        console.log("subscribed to group notifications for group: " + info.id))
    })
    .catch((error)=>{
        console.log(error)
    })
}

//gets the current users id
export function getCurrentUserID(){
    return auth().currentUser.uid;
}

export function getCurrentUserName(){
    return auth().currentUser.displayName;
}

//gets any users public info
export function getUserInfo(uid,userInfoRetrieved){
    var ref = firestore().collection("Users").doc(uid)
    ref.get().then((doc) => {
        userInfoRetrieved(doc.data());

    })
    
}

export async function getGroupInfo(gid, groupInfoRetrieved){
    var ref = firestore().collection("Groups").doc(gid)
    await ref.get().then((doc)=>{
        groupInfoRetrieved(doc.data())
    })
}

//gets the groups the user is in
export async function getCurrentUserGroups(groupsRetrieved,filter){

    if(filter == null){
        //given no filter get all groups in database
        var ref = firestore().collection("Groups").where("GroupUsers","array-contains",getCurrentUserID())
    }
    else{
        //filter by group name
        var ref = firestore().collection("Groups").where("GroupUsers","array-contains",getCurrentUserID()).where("GroupName","==",filter)
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
                    Info: doc.data(),
                    Date: dateString,
                    id: doc.id,
                    index: index,
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
        var ref = firestore().collection("Groups").orderBy("Votes","desc")
    }
    else{
        //filter by interest
        var ref = firestore().collection("Groups").where("Interests","array-contains","#"+filter).orderBy("Votes","desc")
    }

    return ref.onSnapshot((querySnapshot) => {
        const groups = []
        if(querySnapshot !== null){
            var index = 0;

            querySnapshot.forEach((doc) =>{
                if(doc.data().Visible || (!doc.data().visible && doc.data().GroupUsers.includes(getCurrentUserID()))){
                    var date = Date(doc.data().TimeStamp)
                    //removing certain date info
                    var dateArray = date.toString().split(" ")
                    dateArray.pop()
                    dateArray.pop()
                    dateArray.pop()
                    var dateString = dateArray.join(" ")

                    groups.push({
                        Info: doc.data(),
                        Date: dateString,
                        id: doc.id,
                        index: index,
                    });
                    //removing indices of global groups
                    if(doc.data().Coordinates != null){
                        index++
                    }
                }
            });
            groupsRetrieved(groups);
        }
    })
}





//given a group id, gets all messages from that group
//inputs gid - current group id, messagesRetrieved - callback function for retieving messages
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

//requests Camera Library permission
export async function requestCameraPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Camera Permission",
          message:
            "This App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera");
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  }

  //requets Writing to External Storage
  export async function requestWriteExternalPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Write External Permission",
          message:
            "This App needs access to your writing " +
            "so you can store docs..",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can write");
      } else {
        console.log("Writing permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  }
  
   //requetss Read to External Storage
   export async function requestReadExternalPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: "Read External Permission",
          message:
            "This App needs access to your reading " +
            "so you can read docs..",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can read");
      } else {
        console.log("Reading permission denied");
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


export async function retreiveRequests(uid,retrieveRequests){
    var ref = firestore().collection("Users").doc(uid).collection("Requests")
    return ref.onSnapshot((querrySnapshot) =>{
        const groupRequestList = [];
        const friendRequestList = [];
        if (querrySnapshot != null){
            querrySnapshot.forEach((doc) =>{
                if(doc.data().type == "group"){
                    groupRequestList.push({
                        info: doc.data(),
                        docID: doc.id
                    })
                }
                else{
                    friendRequestList.push({
                        info: doc.data(),
                        docID: doc.id
                    })
                }   
                
            })
        }
        retrieveRequests(groupRequestList,friendRequestList);
        
    })

}

export function sendGroupInviteRequest(rid,gid,sid,groupName,userName){
    firestore().collection("Groups").doc(gid).update({
        PendingGroupUsers: firestore.FieldValue.arrayUnion(rid)
    })

    //placing request in users request collection
    firestore().collection("Users").doc(rid).collection("Requests").add({
        user: sid,
        userName: userName,
        group: gid,
        groupName: groupName,
        type: "group",
        invite: true
    })
}

export function acceptGroupInvite(uid,gid,docID){
    addUserToGroup(uid,gid)
    firestore().collection("Groups").doc(gid).update({
        PendingGroupUsers: firestore.FieldValue.arrayRemove(uid),  
    })
    firestore().collection("Users").doc(uid).collection("Requests").doc(docID).delete();
}

export function rejectGroupInvite(uid,gid,docID){
    firestore().collection("Groups").doc(gid).update({
        PendingGroupUsers: firestore.FieldValue.arrayRemove(uid),  
    })
    firestore().collection("Users").doc(uid).collection("Requests").doc(docID).delete();
}


//creates a group entry request
//inputs uid: current user id, gid: groups id, goid: group owner id
export function createGroupRequest(uid,gid,goid,groupName,userName){
    

    //checking if user is in group
    firestore().collection("Groups").doc(gid).get().then((doc) =>{
        
        var pending = doc.data().PendingGroupUsers;
        if(!pending.includes(uid)){

            //placing request in users request collection
            firestore().collection("Users").doc(goid).collection("Requests").add({
                user: uid,
                userName: userName,
                group: gid,
                groupName: groupName,
                type: "group",
                invite: false
            })

            //placing user in pending queue
            firestore().collection("Groups").doc(gid).update({
                PendingGroupUsers: firestore.FieldValue.arrayUnion(uid)
            })
        }
        else{
             console.log("already in group")
        }
    })
    
}

//A function for creating friend requests
//Inputs: uid: current users id, username: current users name, 
//fid: recipients user id
export function createFriendRequest(uid,userName,fid){
    //placing request in users request collection
    firestore().collection("Users").doc(fid).collection("Requests").add({
        user: uid,
        userName: userName,
        type: "friend",
    })

    //placing user in their pending queue
    firestore().collection("Users").doc(fid).update({
        PendingFriends: firestore.FieldValue.arrayUnion(uid)
    })

    //placing user in your pending queue
    firestore().collection("Users").doc(uid).update({
        PendingFriends: firestore.FieldValue.arrayUnion(fid)
    })
}

export function removeFriend(uid,fid){
    firestore().collection("Users").doc(fid).update({
        Friends: firestore.FieldValue.arrayRemove(uid)
    })
    firestore().collection("Users").doc(uid).update({
        Friends: firestore.FieldValue.arrayRemove(fid)
    })
}

//accept user friend request 
//inputs uid: user id who sent request, sid: friend request sender id, docID: request document id
export function acceptFriendRequest(uid,sid,docID){
    firestore().collection("Users").doc(uid).update({
        PendingFriends: firestore.FieldValue.arrayRemove(sid),
        Friends: firestore.FieldValue.arrayUnion(sid)
    })
    firestore().collection("Users").doc(sid).update({
        PendingFriends: firestore.FieldValue.arrayRemove(uid),
        Friends: firestore.FieldValue.arrayUnion(uid)
    })
    firestore().collection("Users").doc(uid).collection("Requests").doc(docID).delete();
    
}

//reject user friend request 
//inputs uid: user id who sent request, sid: friend request sender id, docID: request document id
export function rejectFriendRequest(uid,sid,docID){
    firestore().collection("Users").doc(uid).update({
        PendingFriends: firestore.FieldValue.arrayRemove(sid)
    })
    firestore().collection("Users").doc(sid).update({
        PendingFriends: firestore.FieldValue.arrayRemove(uid),
    })
    firestore().collection("Users").doc(uid).collection("Requests").doc(docID).delete();
    
}

//accept user group request for private groups
//inputs uid: user id who sent request, gid: group id for request, goid: group owner id, 
//docID: the request document id for firebase
export function acceptGroupRequest(uid,gid,goid,docID){
    addUserToGroup(uid,gid)
    firestore().collection("Groups").doc(gid).update({
        PendingGroupUsers: firestore.FieldValue.arrayRemove(uid)
    })
    firestore().collection("Users").doc(goid).collection("Requests").doc(docID).delete();
    
}

//rejects user join request for a specific private group
//inputs uid: user id who sent request, gid: group id for request, goid: group owner id, 
//docID: the request document id for firebase
export function rejectGroupRequest(goid,gid,docID,uid){
    firestore().collection("Users").doc(goid).collection("Requests").doc(docID).delete();
    firestore().collection("Groups").doc(gid).update({
        PendingGroupUsers: firestore.FieldValue.arrayRemove(uid)
    })
}

//Adds interest to users profile
//inputs: uid - current users id, userInterest - an array of interests
export function addInterest(uid,userInterest){
    var ref = firestore().collection("Users").doc(uid)

    
    var hashInterest = []
    userInterest.forEach((item)=>{
        //adding hashtags
        hashInterest.push("#"+item)
        //subscribing to interest topic
        messaging().subscribeToTopic("_"+item)
        .then(( )=> console.log("subscribed to group notifications for group: " + "_"+item))
        .catch((error) => console.log("error subscribing to interest", error))
    })

    ref.update({
        Interests: firestore.FieldValue.arrayUnion.apply(null,hashInterest)
    })

}

export function removeInterest(uid,userInterest){
    var ref = firestore().collection("Users").doc(uid)
    ref.update({
        Interests: firestore.FieldValue.arrayRemove(userInterest)
    })

    var topic = "_"+userInterest.substring(1);
    messaging().unsubscribeFromTopic(topic)
    .then(()=>console.log("unsubscribed to group notifications for group: " + topic ))
    .catch((error) => console.log("error unsubsubscribing to interest", error))
}

export async function retrieveInterests(uid,retrieveInterests){

    return firestore().collection("Users").doc(uid).onSnapshot((doc)=>{
        retrieveInterests(doc.data().Interests)
    })

}

export async function getUsers(usersRetrieved, uid, filter){
    if(filter == null){
        //given no filter get all groups in database
        var ref = firestore().collection("Users").orderBy("UserName")
    }
    else{
        //filter by user name
        var ref = firestore().collection("Users").where("UserName","==",filter)
    }

    return ref.onSnapshot((querySnapshot)=>{
        if(querySnapshot !== null){
            var users = []
            querySnapshot.forEach((doc)=>{

                if(doc.id != uid){
                    if(!((doc.data().Friends != null && doc.data().Friends.includes(uid)) || (doc.data().PendingFriends != null && doc.data().PendingFriends.includes(uid)))){
                        users.push({
                            UserName: doc.data().UserName,
                            id: doc.id,
                            Interests: doc.data().Interests
                        })
                    }
                }
            })
            usersRetrieved(users)
        }

    })
}

export async function getFriends(friendsRetrieved, uid ,filter){
    if(filter == null){
        //given no filter get all groups in database
        var ref = firestore().collection("Users").where("Friends","array-contains",uid).orderBy("UserName")
    }
    else{
        //filter by user name
        var ref = firestore().collection("Users").where("UserName","==",filter).where("Friends","array-contains",uid)
    }

    return ref.onSnapshot((querySnapshot)=>{
        if(querySnapshot !== null){
            var users = []
            querySnapshot.forEach((doc)=>{
                users.push({
                    UserName: doc.data().UserName,
                    id: doc.id,
                    Interests: doc.data().Interests
                })
            })
            friendsRetrieved(users)
        }

    })
}


