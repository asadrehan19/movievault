import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC54vrNM_JjHbKf-FdrERdsi3xL71Hf-9c",
  authDomain: "movievault-76729.firebaseapp.com",
  projectId: "movievault-76729",
  storageBucket: "movievault-76729.appspot.com",
  messagingSenderId: "650444534629",
  appId: "1:650444534629:web:2fde18070c21f9e520e78c",
};

const FirebaseApp = initializeApp(firebaseConfig);

export const fireStoreInstance = getFirestore(FirebaseApp);
export const ReviewRef = collection(fireStoreInstance, "movies");

export default FirebaseApp;
