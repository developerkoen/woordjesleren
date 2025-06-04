import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";

// Firebase configuratie
const firebaseConfig = {
    apiKey: "AIzaSyB59BVbioUciigC0l47T1tQAsF_kPs2Frs",
    authDomain: "leer-app.firebaseapp.com",
    projectId: "leer-app",
    storageBucket: "leer-app.firebasestorage.app",
    messagingSenderId: "1029710103221",
    appId: "1:1029710103221:web:386173aefbed03015574fc"
};

// Initialiseer Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Inlogfunctionaliteit
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Inloggen geslaagd
            const user = userCredential.user;
            alert('Inloggen geslaagd! Welkom, ' + user.email);
            // Hier kun je de gebruiker doorverwijzen naar de volgende pagina
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert('Inloggen mislukt: ' + errorMessage);
        });
});
