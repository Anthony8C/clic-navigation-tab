// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCC_uRuQl51vs2PlRG0XMgviTkIdSsN_88",
  authDomain: "autentication-clic-app-d8416.firebaseapp.com",
  projectId: "autentication-clic-app-d8416",
  storageBucket: "autentication-clic-app-d8416.appspot.com",
  messagingSenderId: "527920752449",
  appId: "1:527920752449:web:b857335f7672534522a3c0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);