// script.js
const bird = document.getElementById("bird");
const pipeTop = document.getElementById("pipe-top");
const pipeBottom = document.getElementById("pipe-bottom");
const scoreDisplay = document.getElementById("score");

let birdTop = 100;
let gravity = 2;
let isGameOver = false;
let score = 0;

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
let pipeLeft = 300;
function movePipes() {
  if (isGameOver) return;
  pipeLeft -= 2;
  if (pipeLeft < -60) {
    pipeLeft = window.innerWidth;
    score++;
    scoreDisplay.innerText = score;

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
  alert("Game Over! Your score: " + score);
  location.reload();
}

setInterval(fall, 30);
setInterval(movePipes, 30);
