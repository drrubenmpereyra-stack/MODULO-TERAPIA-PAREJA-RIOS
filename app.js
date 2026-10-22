// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Your web app's Firebase configuration (Nuevo proyecto exclusivo)
const firebaseConfig = {
    apiKey: "AIzaSyAlP3ApO4-HdHHPdhyfgrhzibK6s-PIIjs",
    authDomain: "modulo-terapia-pareja.firebaseapp.com",
    projectId: "modulo-terapia-pareja",
    storageBucket: "modulo-terapia-pareja.firebasestorage.app",
    messagingSenderId: "856746891223",
    appId: "1:856746891223:web:7fe119aaa6ce42a2ff1d92"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// --- LÓGICA DE AUTENTICACIÓN Y SESIÓN ---
document.addEventListener("DOMContentLoaded", () => {
    const loginContainer = document.getElementById("login-container");
    const appContainer = document.getElementById("app-container");
    const loginForm = document.getElementById("login-form");
    const loginError = document.getElementById("login-error");

    // Verificar si ya hay sesión iniciada en este navegador
    if (localStorage.getItem("sesion_activa") === "GRIOS") {
        loginContainer.style.display = "none";
        appContainer.style.display = "flex";
    }

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const user = document.getElementById("user").value.trim().toUpperCase();
        const pass = document.getElementById("password").value.trim();

        // Validación exclusiva para la Dra. Graciela Ríos
        if (user === "GRIOS" && pass === "R305") {
            localStorage.setItem("sesion_activa", "GRIOS");
            localStorage.setItem("terapeuta_id", "GRIOS");
            loginContainer.style.display = "none";
            appContainer.style.display = "flex";
            loginError.style.display = "none";
        } else {
            loginError.style.display = "block";
        }
    });
});

// Función global para cambiar de módulo en el iframe
window.cargarModulo = function(pagina) {
    const iframe = document.getElementById("main-iframe");
    if (iframe) {
        iframe.src = pagina;
    }
}

// Función global para cerrar sesión
window.logout = function() {
    localStorage.removeItem("sesion_activa");
    localStorage.removeItem("terapeuta_id");
    location.reload();
}