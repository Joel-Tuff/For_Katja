// ➜ HIER ÄNDERN: Benutzername und Passwort
const VALID_USER = "Joel"; // <--- Benutzername anpassen
const VALID_PASS = "28.11.2025"; // <--- Passwort anpassen


function login() {
const user = document.getElementById("username").value;
const pass = document.getElementById("password").value;
const msg = document.getElementById("message");


if (user === VALID_USER && pass === VALID_PASS) {
msg.style.color = "#4caf50";
msg.textContent = "Erfolgreich eingeloggt!";
document.body.classList.add("logged-in");
} else {
msg.style.color = "#ff4b4b";
msg.textContent = "Falscher Benutzer oder Passwort";
shake();
}
}


function shake() {
const card = document.querySelector(".login-card");
card.classList.add("shake");
setTimeout(() => card.classList.remove("shake"), 500);
}
