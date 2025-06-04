// auth.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyB59BVbioUciigC0l47T1tQAsF_kPs2Frs",
  authDomain: "leer-app.firebaseapp.com",
  projectId: "leer-app",
  storageBucket: "leer-app.firebasestorage.app",
  messagingSenderId: "1029710103221",
  appId: "1:1029710103221:web:386173aefbed03015574fc"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Voorbeeld: check ingelogde gebruiker
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log(\"Ingelogd als:\", user.email);
  } else {
    console.log(\"Niet ingelogd\");
  }
});
