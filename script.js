// =======================
// LOGIN
// =======================
let correctUsername = "katja";
let correctPassword = "1234";
let errorMessage = "Falsche Login-Daten!";

let loginBox = document.getElementById("loginBox");
let welcomeScreen = document.getElementById("welcomeScreen");
let welcomeText = document.getElementById("welcomeText");
let gameScreen = document.getElementById("gameScreen");
let startBtn = document.getElementById("startBtn");
let animationScreen = document.getElementById("animationScreen");
let animationText = document.getElementById("animationText");
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
        }, 2500);
    } else {
        errorText.textContent = errorMessage;
    }
}

// =======================
// FLAPPY BIRD GAME
// =======================
let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = 360;
    canvas.height = 480;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let birdY, gravity, velocity;
let pipeX, gap;
let score;
let gameLoop;
let gameRunning = false;

// Steuerung
document.addEventListener("keydown", (e) => { if (e.code === "Space" && gameRunning) velocity = -10; });
canvas.addEventListener("click", () => { if (gameRunning) velocity = -10; });
canvas.addEventListener("touchstart", () => { if (gameRunning) velocity = -10; });

function resetGame() {
    birdY = 200;
    gravity = 1.2;
    velocity = 0;
    pipeX = canvas.width;
    gap = 140;
    score = 0;
    gameRunning = false;
    startBtn.style.display = "block";
    clearInterval(gameLoop);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

resetGame();

function startGame() {
    if (gameRunning) return;

    resetGame();
    gameRunning = true;
    startBtn.style.display = "none";

    gameLoop = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Bird
        velocity += gravity;
        birdY += velocity;
        ctx.fillStyle = "yellow";
        ctx.fillRect(50, birdY, 20, 20);

        // Pipes
        pipeX -= 3;
        if (pipeX < -40) { pipeX = canvas.width; score++; }

        let topPipeHeight = 150;
        let bottomPipeY = topPipeHeight + gap;

        ctx.fillStyle = "green";
        ctx.fillRect(pipeX, 0, 40, topPipeHeight);
        ctx.fillRect(pipeX, bottomPipeY, 40, canvas.height);

        // Score
        ctx.fillStyle = "black";
        ctx.font = "16px Arial";
        ctx.fillText("Punkte: " + score, 10, 20);

        // Collision
        if (
            (birdY < topPipeHeight && 70 > pipeX && 50 < pipeX + 40) ||
            (birdY + 20 > bottomPipeY && 70 > pipeX && 50 < pipeX + 40) ||
            birdY > canvas.height || birdY < 0
        ) { resetGame(); }

        // Win
        if (score >= 10) {
            clearInterval(gameLoop);
            gameScreen.style.display = "none";
            startAnimations();
        }
    }, 20);
}

// =======================
// ANIMATIONEN
// =======================
function startAnimations() {
    let texts = [
        "Jetzt kommen ein paar Fragen über mich",
        "Wenn du nicht eine richtig hast, zerstört sich die Seite selber und du wirst nie das Ende sehen",
        "Viel Glück"
    ];

    let current = 0;

    function showNext() {
        if (current >= texts.length) {
            animationScreen.style.display = "none";
            startQuiz();
            return;
        }

        animationScreen.style.display = "flex";
        animationText.textContent = texts[current];

        switch(current) {
            case 0: animationText.style.animation = "fadeZoom 4s ease-in-out"; break;
            case 1: animationText.style.animation = "glitch 3s infinite"; break;
            case 2: animationText.style.animation = "colorFlash 4s infinite"; break;
        }

        current++;
        setTimeout(showNext, 4000);
    }

    showNext();
}

// =======================
// QUIZ SYSTEM
// =======================
let quizScreen = document.getElementById("quizScreen");
let quizQuestion = document.getElementById("quizQuestion");
let quizAnswer = document.getElementById("quizAnswer");

let quizResultScreen = document.getElementById("quizResultScreen");
let quizResultText = document.getElementById("quizResultText");
let quizScoreText = document.getElementById("quizScore");

// Fragen & Antworten (hier ändern!)
let quizData = [
    {q:"Was ist die Hauptstadt von Deutschland?", a:"Berlin"},
    {q:"Wie viele Kontinente gibt es?", a:"7"},
    {q:"In welchem Jahr landete der erste Mensch auf dem Mond?", a:"1969"},
    {q:"Welche Farbe hat der Himmel an einem klaren Tag?", a:"Blau"}
];

let currentQuestion = 0;
let correctCount = 0;
let wrongCount = 0;

function startQuiz() {
    currentQuestion = 0;
    correctCount = 0;
    wrongCount = 0;
    quizScreen.style.display = "flex";
    showQuestion();
}

function showQuestion() {
    quizAnswer.value = "";
    quizQuestion.textContent = quizData[currentQuestion].q;
    quizAnswer.focus();
}

function submitAnswer() {
    let answer = quizAnswer.value.trim();
    if (answer.toLowerCase() === quizData[currentQuestion].a.toLowerCase()) {
        correctCount++;
    } else {
        wrongCount++;
    }

    currentQuestion++;
    if (currentQuestion >= quizData.length) {
        quizScreen.style.display = "none";
        showQuizResult();
    } else {
        showQuestion();
    }
}

function showQuizResult() {
    quizResultScreen.style.display = "flex";
    quizResultText.textContent = "Quiz beendet!";
    quizScoreText.textContent = `Richtig: ${correctCount} | Falsch: ${wrongCount}`;
}

