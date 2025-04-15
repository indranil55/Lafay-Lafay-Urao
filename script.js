// script.js
const bird = document.getElementById("bird");
const pipeTop = document.getElementById("pipe-top");
const pipeBottom = document.getElementById("pipe-bottom");
const scoreDisplay = document.getElementById("score");
const gameOverDisplay = document.getElementById("game-over");
const leaderboardDisplay = document.getElementById("leaderboard-scores");
const speedControl = document.getElementById("speed");
const restartButton = document.getElementById("restart");

let birdTop = 100;
let gravity = 2;
let isGameOver = false;
let score = 0;
let pipeSpeed = 2;
let pipeLeft = 300;

// Local storage for leaderboard
let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

// Update leaderboard
function updateLeaderboard() {
  leaderboard.sort((a, b) => b.score - a.score);
  leaderboardDisplay.innerText = leaderboard
    .map(entry => `${entry.name}: ${entry.score}`)
    .join(", ");
  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
}

// Bird gravity
function fall() {
  if (isGameOver) return;
  birdTop += gravity;
  bird.style.top = birdTop + "px";
  checkCollision();
}

// Jump on click
window.addEventListener("click", () => {
  if (isGameOver) return;
  birdTop -= 40;
  bird.style.top = birdTop + "px";
});

// Move pipes
function movePipes() {
  if (isGameOver) return;
  pipeLeft -= pipeSpeed;
  if (pipeLeft < -60) {
    pipeLeft = window.innerWidth;
    score++;
    scoreDisplay.innerText = `Score: ${score}`;

    // random height
    const topHeight = Math.floor(Math.random() * 200) + 50;
    pipeTop.style.height = topHeight + "px";
    pipeBottom.style.height = (window.innerHeight - topHeight - 150) + "px";
  }
  pipeTop.style.left = pipeLeft + "px";
  pipeBottom.style.left = pipeLeft + "px";
}

// Collision detection
function checkCollision() {
  const birdRect = bird.getBoundingClientRect();
  const topRect = pipeTop.getBoundingClientRect();
  const bottomRect = pipeBottom.getBoundingClientRect();

  if (
    birdRect.bottom >= window.innerHeight ||
    (birdRect.right > topRect.left &&
     birdRect.left < topRect.right &&
     (birdRect.top < topRect.bottom || birdRect.bottom > bottomRect.top))
  ) {
    gameOver();
  }
}

function gameOver() {
  isGameOver = true;
  gameOverDisplay.style.display = "block";
  // Save score to leaderboard if it's high enough
  const playerName = prompt("Game Over! Enter your name:");
  if (playerName) {
    leaderboard.push({ name: playerName, score: score });
    updateLeaderboard();
  }
}

// Restart game
restartButton.addEventListener("click", () => {
  isGameOver = false;
  score = 0;
  scoreDisplay.innerText = `Score: 0`;
  birdTop = 100;
  bird.style.top = birdTop + "px";
  pipeLeft = 300;
  pipeTop.style.left = pipeLeft + "px";
  pipeBottom.style.left = pipeLeft + "px";
  gameOverDisplay.style.display = "none";
  pipeSpeed = speedControl.value;
});

speedControl.addEventListener("input", () => {
  pipeSpeed = speedControl.value;
});

setInterval(fall, 30);
setInterval(movePipes, 30);
