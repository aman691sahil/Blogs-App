// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDK_KlyN9bovGl1N0MCENaoQ6dVASqba58",
  authDomain: "blogging-app-8ff10.firebaseapp.com",
  projectId: "blogging-app-8ff10",
  storageBucket: "blogging-app-8ff10.appspot.com",
  messagingSenderId: "422453013756",
  appId: "1:422453013756:web:fe9c24f31d7ad1c6aa3b79"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
//Export the reference to be used in other files
export const db = getFirestore(app);

/**const firebaseConfig = {
  apiKey: "*********************************",
  authDomain: "*******************************",
  projectId: "***********************",
  storageBucket: "******************************",
  messagingSenderId: "******************",
  appId: "************************"
}; */