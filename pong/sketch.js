let playerOneX, playerOneY;
let paddleWidth, paddleHeight, paddleSpeed;

let ballX, ballY, ballHeight, ballWidth, speedX, speedY;

let playerOneUp, playerOneDown;

//let playerOneColor = color(255, 0, 0);

let ballShootX, ballShootY;

let playerOneScore = 0;

function setup(){
  //size(500,500);
  createCanvas(windowWidth, windowHeight);
  ballX = width / 2;
  ballY = height / 2;
  ballWidth = 50;
  ballHeight = 50;
  speedX = 2;
  speedY = 2;

  ballShootX = random(1, 4);
  ballShootY = random(1, 4);

  paddleWidth = 30;
  paddleHeight = 100;
  paddleSpeed = 5;

  playerOneX = 40;
  playerOneY = height / 2 - paddleHeight / 2;

}

function draw(){
  background(0);

  drawBall();
  moveBall();
  ballBounce();
  drawPaddles();
  movePaddles();
  contactPaddle();
  scores();
}

function drawPaddles(){
  fill(color(255, 204, 0));
  rect(playerOneX, playerOneY, paddleWidth, paddleHeight);
}

function movePaddles(){
  if (playerOneUp) {
    playerOneY = playerOneY - paddleSpeed;
  }
  if (playerOneDown) {
    playerOneY = playerOneY + paddleSpeed;
  }
}

function moveBall(){
  ballX += speedX * ballShootX;
  ballY += speedY * ballShootY;
}


function ballBounce(){
  if (ballX > width - ballWidth / 2) {
    speedX = -speedX;
    playerOneScore += 1;
  } else if (ballX < ballWidth / 2) {
    speedX = -speedX;
  }

  if (ballY > height - ballHeight / 2 || ballY < ballHeight / 2) {
    speedY = -speedY;
  }
}


function drawBall(){
  fill(255);
  ellipse(ballX, ballY, ballWidth, ballHeight);
}


function contactPaddle(){
  if (ballX - ballWidth / 2 < playerOneX + paddleWidth && ballY < playerOneY + paddleHeight && ballY > playerOneY) {
    speedX = -speedX;
  }
}

function scores(){
  fill(255);
  text(playerOneScore, 100, 50);
}

function keyPressed(){
  if (key == 'w' || key == 'W') {
    playerOneUp = true;
  }
  if (key == 's' || key == 'S') {
    playerOneDown = true;
  }
}

function keyReleased(){
  if (key == 'w' || key == 'W') {
    playerOneUp = false;
  }
  if (key == 's' || key == 'S') {
    playerOneDown = false;
  }
}