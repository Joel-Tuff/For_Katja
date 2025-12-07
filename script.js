// ✅ HIER kannst du deine Login-Daten ändern:
let correctUsername = "admin";
let correctPassword = "1234";

// ✅ HIER kannst du den Fehlertext ändern:
let errorMessage = "TIPP: Benutzer=Name Passwort=Datum ";

function login() {
    let usernameInput = document.getElementById("username").value;
    let passwordInput = document.getElementById("password").value;
    let errorText = document.getElementById("error-text");

    if (usernameInput === correctUsername && passwordInput === correctPassword) {
        errorText.style.color = "lime";
        errorText.textContent = "Login erfolgreich!";
        
        // Optional: Weiterleitung
        // window.location.href = "dashboard.html";
    } else {
        errorText.style.color = "#ff4d4d";
        errorText.textContent = errorMessage;
    }
}

