// ✅ LOGIN DATEN ÄNDERN
let correctUsername = "katja";
let correctPassword = "1234";
let errorMessage = "Falsche Login-Daten!";

// ✅ ELEMENTE
let loginBox = document.getElementById("loginBox");
let welcomeScreen = document.getElementById("welcomeScreen");
let welcomeText = document.getElementById("welcomeText");
let gameScreen = document.getElementById("gameScreen");
let endScreen = document.getElementById("endScreen");
let errorText = document.getElementById("error-text");

function login() {
    let u = document.getElementById("username").value;
    let p = document.getElementById("password").value;

    if (u === correctUsername && p === correctPassword) {
        loginBox.style.display = "none";
        welcomeText.textContent = "Willkommen " + u.toUpperCase();
        welcomeScreen.style.display = "flex";

        setTimeout(() => {
            welcomeScreen.style.display = "none";
            gameScreen.style.display = "flex";
            startGame();
        }, 2500);
    } else {
        errorText.textContent = errorMessage;
    }
}

// ✅ FLAPPY BIRD MINI GAME
let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

let birdY = 200;
let gravity = 1.5;
let velocity = 0;
let pipeX = 400;
let gap = 130;
let score = 0;

document.addEventListener("keydown", () => velocity = -10);

function startGame() {
    let gameLoop = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Bird
        velocity += gravity;
        birdY += velocity;
        ctx.fillStyle = "yellow";
        ctx.fillRect(50, birdY, 20, 20);

        // Pipe
        pipeX -= 3;
        if (pipeX < -40) {
            pipeX = 400;
            score++;
        }

        ctx.fillStyle = "green";
        ctx.fillRect(pipeX, 0, 40, 150);
        ctx.fillRect(pipeX, 280, 40, 300);

        ctx.fillStyle = "black";
        ctx.fillText("Punkte: " + score, 10, 20);

        // WIN
        if (score >= 10) {
            clearInterval(gameLoop);
            gameScreen.style.display = "none";
            endScreen.style.display = "flex";
        }

    }, 20);
}
