const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// Paddle Variables
const paddleWidth = 10;
const paddleHeight = 100;
let paddle1Y = canvas.height / 2 - paddleHeight / 2;
let paddle2Y = canvas.height / 2 - paddleHeight / 2;

const paddleSpeed = 8;

// Ball Variables
const ballSize = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;

// Keyboard State
let keys = {};

// Listen for key presses
document.addEventListener('keydown', (e) => {
  keys[e.key] = true;
});

document.addEventListener('keyup', (e) => {
  keys[e.key] = false;
});

// Draw Functions
function drawRect(x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

function drawCircle(x, y, radius, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, false);
  ctx.fill();
}

function draw() {
  drawRect(0, 0, canvas.width, canvas.height, 'black');

  drawRect(0, paddle1Y, paddleWidth, paddleHeight, 'white');
  drawRect(canvas.width - paddleWidth, paddle2Y, paddleWidth, paddleHeight, 'white');

  drawCircle(ballX, ballY, ballSize, 'white');
}

// Update Function
function update() {
  // Move paddles based on keys
  if (keys['w']) paddle1Y -= paddleSpeed;
  if (keys['s']) paddle1Y += paddleSpeed;

  if (keys['ArrowUp']) paddle2Y -= paddleSpeed;
  if (keys['ArrowDown']) paddle2Y += paddleSpeed;

  // Prevent paddles from leaving screen
  paddle1Y = Math.max(0, Math.min(canvas.height - paddleHeight, paddle1Y));
  paddle2Y = Math.max(0, Math.min(canvas.height - paddleHeight, paddle2Y));

  // Move Ball
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Ball Collision with Top and Bottom
  if (ballY - ballSize < 0 || ballY + ballSize > canvas.height) {
    ballSpeedY = -ballSpeedY;
  }

  // Ball Collision with Paddles
  if (
    (ballX - ballSize < paddleWidth &&
     ballY > paddle1Y &&
     ballY < paddle1Y + paddleHeight) ||
    (ballX + ballSize > canvas.width - paddleWidth &&
     ballY > paddle2Y &&
     ballY < paddle2Y + paddleHeight)
  ) {
    ballSpeedX = -ballSpeedX;
  }

  // Ball Out of Bounds
  if (ballX - ballSize < 0 || ballX + ballSize > canvas.width) {
    resetBall();
  }
}

function resetBall() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = -ballSpeedX;
}

// Game Loop
function gameLoop() {
  draw();
  update();
  requestAnimationFrame(gameLoop);
}

gameLoop();
