import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCO1E9vIJgPwXvs50D9hq7xxQFb1-FT6iQ",
  authDomain: "voyage-project-surgerystatus.firebaseapp.com",
  projectId: "voyage-project-surgerystatus",
  storageBucket: "voyage-project-surgerystatus.firebasestorage.app",
  messagingSenderId: "1095344570107",
  appId: "1:1095344570107:web:5ff3dee27ae88f7bc63a5e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };