let covidBall;
let ballX, ballY, ballH, ballW;
let ballSpeedX, ballSpeedY;
let ballShootX, ballShootY;

let leftMask, rightMask;
let maskW, maskH; 
let leftMaskX, leftMaskY, rightMaskX, rightMaskY;
let maskSpeed; 
let leftMaskUp, leftMaskDown, rightMaskUp, rightMaskDown;

let leftMaskScore = 0, rightMaskScore = 0;

let leftTemp = 30;
let rightTemp = 30;


// preload all images 
function preload() {
  covidBall = loadImage('/pong/img/coronavirus.png');
  leftMask = loadImage('/pong/img/left-mask.png');
  rightMask = loadImage('/pong/img/right-mask.png');
  bgImg = loadImage('/pong/img/visuals-Pd2hIHv95FY-unsplash.jpg');
  leftTherma = loadImage('/pong/img/therma-left.png');
  rightTherma = loadImage('/pong/img/therma-right.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  //Corona Ball 
  ballW = 100;
  ballH =100;
  ballX = width / 2;
  ballY = height / 2;
  ballSpeedX = 2;
  ballSpeedY = 2;
  ballShootX = random(1, 4);
  ballShootY = random(1, 4);

  // Mask Paddles 
  maskW = 100;
  maskH = 225;
  maskSpeed = 5; 
  leftMaskX = 150 - maskW;
  leftMaskY = height / 2 - maskH / 2;
  rightMaskX = width - 150;
  rightMaskY = height  / 2 - maskH / 2;
}

function draw() {
  background(bgImg)

  //white background for score 
  fill(255);
  noStroke();
  rect(225, 30, width - 450, 120, 20);

  // masks 
  image(leftMask, leftMaskX, leftMaskY, maskW, maskH);
  image(rightMask, rightMaskX, rightMaskY, maskW, maskH);

  //left temp rect
  fill(204, 0, 0);
  noStroke();
  rect(300, 73, leftTemp, 30, 20);

  //right temp rect
  rect(width - 400, 73, rightTemp, 30, 20);

  //thermometers
  image(rightTherma, width - 450, 50, 200, 80);
  image(leftTherma, 250, 50, 200, 80)
 
  //covid ball
  image(covidBall, ballX, ballY, ballW, ballH);

  //call them functions 
  moveBall()
  bounceBall()
  moveRightMask()
  moveLeftMask()
  contactMask()
  scores()
  // rightLost()
  // leftLost()
  gameOver()
} 

function moveBall(){
    ballX += ballSpeedX * ballShootX;
    ballY += ballSpeedY * ballShootY;
}

function bounceBall(){
  if (ballX > width - ballW || ballX < 0) {
    ballSpeedX *= -1;
  } 
 //add scoring over here
  if (ballY > height - ballH || ballY < 0) {
    ballSpeedY *= -1;
  }
 }

function moveLeftMask(){
 if(leftMaskUp || leftMaskY > height - maskH || leftMaskY < 0) {
  leftMaskY = leftMaskY - maskSpeed;
 }

 if(leftMaskDown || leftMaskY > height - maskH || leftMaskY < 0) {
  leftMaskY = leftMaskY + maskSpeed;
 }
}

function moveRightMask(){
  if(rightMaskUp || rightMaskY > height - maskH || rightMaskY < 0) {
   rightMaskY = rightMaskY - maskSpeed;
  }
 
  if(rightMaskDown || rightMaskY > height - maskH || rightMaskY < 0) {
   rightMaskY = rightMaskY + maskSpeed;
  }
 }
 
function contactMask(){
  if((ballX + 10) < leftMaskX + maskW && (ballY + 10) < leftMaskY + maskH && (ballY - 10) > leftMaskY) {
    ballSpeedX = -ballSpeedX;
  }

  if((ballX - 10) + ballW > rightMaskX && (ballY + 10) < rightMaskY + maskH && (ballY - 10) > rightMaskY) {
    ballSpeedY = -ballSpeedY;
  }
}

function scores(){
  fill(255);
  text(leftMaskScore, 150, 50);
  text(rightMaskScore, width - 150, 50);

  if(ballX < 0 && leftMaskScore < 5){
    leftMaskScore = leftMaskScore += 1;
  }

  if(ballX + ballW > width && rightMaskScore < 5){
    rightMaskScore = rightMaskScore += 1;
  }
}

function gameOver(){
  if (leftMaskScore == 5 || rightMaskScore == 5){
    ballSpeedX = 0;
    ballSpeedY = 0;
    maskSpeed = 0;
  }
}

// function leftLost(){
//   if (leftMaskScore <= 0){

//   }
// }

// function rightLost(){
//   if (rightMaskScore <= 0){

//   }
// }

function keyPressed() {
  if (key == 'w' || key == 'W') {
    leftMaskUp = true;
  }
   if (key == 's' || key == 'S') {
    leftMaskDown = true;
  }

  if (key == 'o' || key == 'O') {
    rightMaskUp = true;
  }
   if (key == 'l' || key == 'L') {
    rightMaskDown = true;
  }
}

function keyReleased() {
  if (key == 'w' || key == 'W') {
    leftMaskUp = false;
  }
   if (key == 's' || key == 'S') {
    leftMaskDown = false;
  }

  if (key == 'o' || key == 'O') {
    rightMaskUp = false;
  }
   if (key == 'l' || key == 'L') {
    rightMaskDown = false;
  }
}
