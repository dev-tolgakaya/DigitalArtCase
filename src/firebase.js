import firebase from "firebase/app"
import "firebase/auth"



const app = firebase.initializeApp({
    apiKey: "AIzaSyBYMY_FtZ6DLdngIMvL0CxAg8b5vv5OLCs",
    authDomain: "digital-last.firebaseapp.com",
    projectId: "digital-last",
    storageBucket: "digital-last.appspot.com",
    messagingSenderId: "217370667003",
    appId: "1:217370667003:web:e0cb8a72d2b36cda0f4d5e"
})


export const auth = app.auth();
export default app
