// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAWJcR2DDQy_RS6UiLwGCbYMPSZU0816E8",
    authDomain: "admin-asistencia.firebaseapp.com",
    projectId: "admin-asistencia",
    storageBucket: "admin-asistencia.appspot.com",
    messagingSenderId: "1099192750494",
    appId: "1:1099192750494:web:828339c0334de6c8fc068f",
    measurementId: "G-J3ZV4VEBBE"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
const db = getFirestore(appFirebase);
// const analytics = getAnalytics(app);

export default appFirebase;
export {db};