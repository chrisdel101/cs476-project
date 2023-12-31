// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJ9ODKOwRRJK70bYoy4Tom2vH2MksiHEU",
  authDomain: "cs476-freebee.firebaseapp.com",
  projectId: "cs476-freebee",
  storageBucket: "cs476-freebee.appspot.com",
  messagingSenderId: "45042689290",
  appId: "1:45042689290:web:b0f93f08881dc0787d06f3",
  measurementId: "G-4CJHQVFELR"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// allow undefined values to be added to DB
initializeFirestore(app, {
  ignoreUndefinedProperties: true
});
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
const storage = getStorage(app);

