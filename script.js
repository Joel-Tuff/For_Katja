// ✅ LOGIN DATEN
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
let startBtn = document.getElementById("startBtn");

// ✅ LOGIN
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
        }, 2500);
    } else {
        errorText.textContent = errorMessage;
    }
}

// ✅ FLAPPY BIRD GAME
let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

let birdY, gravity, velocity;
let pipeX, gap;
let score;
let gameLoop;
let gameRunning = false;

document.addEventListener("keydown", () => {
    if (gameRunning) velocity = -10;
});

function resetGame() {
    birdY = 200;
    gravity = 1.5;
    velocity = 0;
    pipeX = 400;
    gap = 130;
    score = 0;
    gameRunning = false;
    startBtn.style.display = "block";
    clearInterval(gameLoop);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

resetGame();

function startGame() {
    if (gameRunning) return;

    gameRunning = true;
    startBtn.style.display = "none";

    gameLoop = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // ✅ BIRD
        velocity += gravity;
        birdY += velocity;
        ctx.fillStyle = "yellow";
        ctx.fillRect(50, birdY, 20, 20);

        // ✅ PIPE
        pipeX -= 3;
        if (pipeX < -40) {
            pipeX = 400;
            score++;
        }

        let topPipeHeight = 150;
        let bottomPipeY = topPipeHeight + gap;

        ctx.fillStyle = "green";
        ctx.fillRect(pipeX, 0, 40, topPipeHeight);
        ctx.fillRect(pipeX, bottomPipeY, 40, 500);

        // ✅ SCORE
        ctx.fillStyle = "black";
        ctx.fillText("Punkte: " + score, 10, 20);

        // ✅ KOLLISION
        if (
            birdY < topPipeHeight && 50 + 20 > pipeX && 50 < pipeX + 40 ||
            birdY + 20 > bottomPipeY && 50 + 20 > pipeX && 50 < pipeX + 40 ||
            birdY > canvas.height
        ) {
            resetGame(); // 💀 NEUSTART
        }

        // ✅ WIN
        if (score >= 10) {
            clearInterval(gameLoop);
            gameScreen.style.display = "none";
            endScreen.style.display = "flex";
        }

    }, 20);
}
