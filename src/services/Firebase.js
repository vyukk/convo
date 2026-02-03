import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyDVS3iZyPbAm-L_jFycsb97ubBYHMSi5lA",
  authDomain: "bond-ef19f.firebaseapp.com",
  projectId: "bond-ef19f",
  storageBucket: "bond-ef19f.appspot.com", // fixed
  messagingSenderId: "94531634131",
  appId: "1:94531634131:web:af9061767b731b555f2526",
  measurementId: "G-RQ6G4QWD8W"
};


const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)
export const storage = getStorage(app)