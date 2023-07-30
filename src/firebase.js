import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyATpvw4PE5h3zs-BzheIsruoL2optQem-g",
  authDomain: "react-chat-app-70f58.firebaseapp.com",
  projectId: "react-chat-app-70f58",
  storageBucket: "react-chat-app-70f58.appspot.com",
  messagingSenderId: "614642333109",
  appId: "1:614642333109:web:6695ffc7293a0b303e95fc",
};

initializeApp(firebaseConfig);

const auth = getAuth();
const provider = new GoogleAuthProvider();
const db = getFirestore();

export { auth, provider, db };
