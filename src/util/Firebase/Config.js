// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB0b1sRbpatwlzIMNE-FZK4MgXGQB2K_U0",
    authDomain: "image-uploader-ab3f5.firebaseapp.com",
    projectId: "image-uploader-ab3f5",
    storageBucket: "image-uploader-ab3f5.firebasestorage.app",
    messagingSenderId: "58226536519",
    appId: "1:58226536519:web:e0a6abccb6bb435d578162",
    measurementId: "G-JQY48V589G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const imgDb = getStorage(app)