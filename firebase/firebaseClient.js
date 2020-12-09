import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: "social-media-93a8a.appspot.com",
    messagingSenderId: "676689473337",
    appId: "1:676689473337:web:80f28123a1c5cdf73dc2e8",
  });
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const functions = firebase.functions();
export const storage = firebase.storage();

//development only
// firestore.useEmulator("localhost", 8080);
// functions.useEmulator("localhost", 5001);

export default firebase;
