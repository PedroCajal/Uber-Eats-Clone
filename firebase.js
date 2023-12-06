// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABm-lSPv3iXNYdAaMZrarOFnbH136_Eng",
  authDomain: "rn-uber-eats-clone-c5080.firebaseapp.com",
  projectId: "rn-uber-eats-clone-c5080",
  storageBucket: "rn-uber-eats-clone-c5080.appspot.com",
  messagingSenderId: "678463202596",
  appId: "1:678463202596:web:f61ae79ad522794e9fffb1"
};

 export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);