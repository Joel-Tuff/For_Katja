// script.js
// ➜ HIER ÄNDERN: Benutzername und Passwort
const VALID_USER = "admin";   // Benutzername
const VALID_PASS = "1234";    // Passwort

// ➜ HIER ÄNDERN: Tipps für das Menü
const TIP_1 = "Tipp 1 hier eintragen";
const TIP_2 = "Tipp 2 hier eintragen";

function loadTips() {
const list = document.getElementById("tipsList");
list.innerHTML = `         <li>${TIP_1}</li>         <li>${TIP_2}</li>
    `;
}

function toggleTips() {
const box = document.getElementById("tipsBox");
box.classList.toggle("open");
}

function login() {
const user = document.getElementById("username").value;
const pass = document.getElementById("password").value;
const msg = document.getElementById("message");

```
if (user === VALID_USER && pass === VALID_PASS) {
    msg.style.color = "#4caf50";
    msg.textContent = "Willkommen zurück!";
    document.body.classList.add("logged-in");
    document.querySelector(".login-card").style.boxShadow = "0 15px 50px rgba(0,0,0,0.4)";
} else {
    msg.style.color = "#ff4b4b";
    msg.textContent = "Benutzer oder Passwort falsch";
    shake();
}
```

}

function shake() {
const card = document.querySelector(".login-card");
card.classList.add("shake");
setTimeout(() => card.classList.remove("shake"), 500);
}

