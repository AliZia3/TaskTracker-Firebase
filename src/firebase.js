// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyADlcq-SLMTVV-6izH-ix-272s_rMFTtEg",
	authDomain: "task-tracker-b5f45.firebaseapp.com",
	projectId: "task-tracker-b5f45",
	storageBucket: "task-tracker-b5f45.appspot.com",
	messagingSenderId: "310974832286",
	appId: "1:310974832286:web:bd396e2416e930fa57658f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
