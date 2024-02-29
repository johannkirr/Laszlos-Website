

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from 'firebase/auth';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgYEWHmqNd5j0Ph1dbY35ntVoauupZjBA",
  authDomain: "uploadingfile-cbb8c.firebaseapp.com",
  projectId: "uploadingfile-cbb8c",
  storageBucket: "uploadingfile-cbb8c.appspot.com",
  messagingSenderId: "428574656288",
  appId: "1:428574656288:web:d2a316358a1e8edd9eb945"
};

// init firebase and firestore
const app = initializeApp(firebaseConfig);
const storage = getStorage(app)
const db = getFirestore()

//init firebase auth 
const auth = getAuth()

export {storage, db, auth}