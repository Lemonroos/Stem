// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseKey= process.env.REACT_APP_FIREBASE_API_KEY;
const firebaseConfig = {
  apiKey: "IzaSyDc-ANFMFUanVvQuuqpQOlNy8I04CKMigM",
  authDomain: "stem-c0fd7.firebaseapp.com",
  projectId: "stem-c0fd7",
  storageBucket: "stem-c0fd7.appspot.com",
  messagingSenderId: "919380362903",
  appId: "1:919380362903:web:ff34068b8fb46ae2618bd2",
  measurementId: "G-YSPSK3PBK3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const storage = getStorage(app);