import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  // apiKey: "AIzaSyAWi_Z4IjIIChkCI7SsR7-pvOIwDHFfxBs",
  // authDomain: "video-94ed5.firebaseapp.com",
  // projectId: "video-94ed5",
  // storageBucket: "video-94ed5.firebasestorage.app",
  // messagingSenderId: "862671000382",
  // appId: "1:862671000382:web:2d6a7d522f66fe3a15126f"

  apiKey: "AIzaSyDLofoC6N_oTXTtudOR3A49fa2ykHfXZ3A",
  authDomain: "blogapp-5f245.firebaseapp.com",
  projectId: "blogapp-5f245",
  storageBucket: "blogapp-5f245.appspot.com",
  messagingSenderId: "560709961842",
  appId: "1:560709961842:web:171fdba91fa678cf679aeb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;