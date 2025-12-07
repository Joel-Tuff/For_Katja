// ✅ HIER kannst du deine Login-Daten ändern:
let correctUsername = "katja";
let correctPassword = "1234";

// ✅ HIER kannst du den Fehlertext ändern:
let errorMessage = "Falscher Benutzername oder Passwort!";

function login() {
    let usernameInput = document.getElementById("username").value;
    let passwordInput = document.getElementById("password").value;
    let errorText = document.getElementById("error-text");

    let loginBox = document.getElementById("loginBox");
    let welcomeScreen = document.getElementById("welcomeScreen");
    let welcomeText = document.getElementById("welcomeText");

    if (usernameInput === correctUsername && passwordInput === correctPassword) {
        // ✅ LOGIN AUSBLENDEN
        loginBox.style.display = "none";

        // ✅ WILLKOMMEN TEXT SETZEN
        welcomeText.textContent = "Willkommen " + usernameInput.toUpperCase();

        // ✅ ANIMATION EINBLENDEN
        welcomeScreen.style.display = "flex";

    } else {
        errorText.style.color = "#ff4d4d";
        errorText.textContent = errorMessage;
    }
}
