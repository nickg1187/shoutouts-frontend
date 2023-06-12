// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0bVEZIageZj-qu1AK44V0TjgtUF4CacU",
  authDomain: "shoutouts-a7b4b.firebaseapp.com",
  projectId: "shoutouts-a7b4b",
  storageBucket: "shoutouts-a7b4b.appspot.com",
  messagingSenderId: "509169504016",
  appId: "1:509169504016:web:33308f4e1ebab290225f95",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const authProvider = new GoogleAuthProvider();

export function signInWithGoogle(): void {
  signInWithPopup(auth, authProvider);
}
export function signOut(): void {
  auth.signOut();
}

export const storage = getStorage(app);
