import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "@firebase/firestore"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgYEWHmqNd5j0Ph1dbY35ntVoauupZjBA",
  authDomain: "uploadingfile-cbb8c.firebaseapp.com",
  projectId: "uploadingfile-cbb8c",
  storageBucket: "uploadingfile-cbb8c.appspot.com",
  messagingSenderId: "428574656288",
  appId: "1:428574656288:web:d2a316358a1e8edd9eb945"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
export const db = getFirestore()