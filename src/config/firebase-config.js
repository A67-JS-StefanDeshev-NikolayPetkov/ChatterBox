// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAQ4MPYyDK3JtaMN6uXa8XAE-pmGFHGEoQ",
  authDomain: "chatterbox-f5970.firebaseapp.com",
  projectId: "chatterbox-f5970",
  storageBucket: "chatterbox-f5970.firebasestorage.app",
  messagingSenderId: "860974360414",
  appId: "1:860974360414:web:276b236558c6681c03d1cf",
  measurementId: "G-L3BXEBLDXJ",
  databaseURL:
    "https://chatterbox-f5970-default-rtdb.europe-west1.firebasedatabase.app/",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
