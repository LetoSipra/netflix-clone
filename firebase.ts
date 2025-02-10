// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASY5Ly0wGgGIwTTQFEuSbkMgRMpcD84GU",
  authDomain: "netflix-clone-209df.firebaseapp.com",
  databaseURL: "https://netflix-clone-209df-default-rtdb.firebaseio.com",
  projectId: "netflix-clone-209df",
  storageBucket: "netflix-clone-209df.appspot.com",
  messagingSenderId: "336216323434",
  appId: "1:336216323434:web:1bba20411e1dffdd4c6113"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export {auth, db}