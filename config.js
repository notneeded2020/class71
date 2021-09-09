
import * as firebase from "firebase"
require("@firebase/firestore")

const firebaseConfig = {
    apiKey: "AIzaSyC9x0y0V2gZ7JDTAS68V7C5sloJj9z9qTc",
    authDomain: "wily-81ebd.firebaseapp.com",
    databaseURL:"https://wily-81ebd.firebaseio.com",
    projectId: "wily-81ebd",
    storageBucket: "wily-81ebd.appspot.com",
    messagingSenderId: "632161705564",
    appId: "1:632161705564:web:69b7288b927553b3e69099"
  };

  firebase.initializeApp(firebaseConfig)

  export default firebase.firestore()