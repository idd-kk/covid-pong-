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

let viral 
let play


// preload all images 
function preload() {
  covidBall = loadImage('/pong/img/coronavirus.png');
  leftMask = loadImage('/pong/img/left-mask.png');
  rightMask = loadImage('/pong/img/right-mask.png');
  bgImg = loadImage('/pong/img/visuals-Pd2hIHv95FY-unsplash.jpg');
  leftTherma = loadImage('/pong/img/therma-left.png');
  rightTherma = loadImage('/pong/img/therma-right.png');
  viral = loadImage('/pong/img/viral-load.png');
  play = loadImage('/pong/img/play.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  //Corona Ball 
  ballW = 100;
  ballH =100;
  ballX = width / 2;
  ballY = height / 2;
  ballSpeedX = 3;
  ballSpeedY = 3;
  ballShootX = random(1, 4);
  ballShootY = random(1, 4);

  // Mask Paddles 
  maskW = 100;
  maskH = 200;
  maskSpeed = 5; 
  leftMaskX = 120 - maskW;
  leftMaskY = height / 2 - maskH / 2;
  rightMaskX = width - 120;
  rightMaskY = height  / 2 - maskH / 2;
}

function draw() {
  background(bgImg)

  //white background for score 
  fill(255);
  noStroke();
  rect(180, 30, width - 360, 120, 20);

  // masks 
  image(leftMask, leftMaskX, leftMaskY, maskW, maskH);
  image(rightMask, rightMaskX, rightMaskY, maskW, maskH);

  //left temp rect
  fill(204, 0, 0);
  noStroke();
  rect(250, 73, leftTemp, 30, 20);

  //right temp rect
  rect(width - 350, 73, rightTemp, 30, 20);

  //thermometers
  image(leftTherma, 200, 50, 200, 80)
  image(rightTherma, width - 400, 50, 200, 80);
  
  //covid ball
  image(covidBall, ballX, ballY, ballW, ballH);

  //call them functions 
  moveBall()
  bounceBall()
  moveRightMask()
  moveLeftMask()
  contactMask()
  scores()
  thermoUp()
  gameOver()
  rightLost()
  leftLost()
  playBtn()
} 

function moveBall(){
    ballX += ballSpeedX * ballShootX;
    ballY += ballSpeedY * ballShootY;
}

function bounceBall(){
  if (ballX > width - ballW || ballX < 0) {
    ballSpeedX = -ballSpeedX;
  } 
 //add scoring over here
  if (ballY > height - ballH || ballY < 0) {
    ballSpeedY = -ballSpeedY;
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
  if(ballX < leftMaskX + maskW && 
    ballY < leftMaskY + maskH && 
    ballY > leftMaskY) {

    ballSpeedX = -ballSpeedX;
  }

  if(ballX < leftMaskX + maskW && 
    ballY < leftMaskY + maskH && 
    ballY > leftMaskY) {

    ballSpeedY = -ballSpeedY;
  }

  if(ballX + ballW > rightMaskX && 
    ballY < rightMaskY + maskH && 
    ballY > rightMaskY) {

    ballSpeedX = -ballSpeedX;
  }

  if(ballX + ballW > rightMaskX && 
    ballY < rightMaskY + maskH && 
    ballY > rightMaskY) {

    ballSpeedY = -ballSpeedY;
  }
}

function scores(){
  // fill(255);
  // text(leftMaskScore, 150, 50);
  // text(rightMaskScore, width - 150, 50);

  if(ballX < 0 && leftMaskScore < 5){
    leftMaskScore = leftMaskScore += 1;
  }

  if(ballX + ballW > width && rightMaskScore < 5){
    rightMaskScore = rightMaskScore += 1;
  }
}

function thermoUp(){
  if(leftMaskScore == 1){
    leftTemp = 50;
  }else if(leftMaskScore == 2){
    leftTemp = 70;
  }else if(leftMaskScore == 3){
    leftTemp = 90;
  }else if(leftMaskScore == 4){
    leftTemp = 110;
  }else if(leftMaskScore == 5){
    leftTemp = 130;
  }

  if(rightMaskScore == 1){
    rightTemp = 50;
  }else if(rightMaskScore == 2){
    rightTemp = 70;
  }else if(rightMaskScore == 3){
    rightTemp = 90;
  }else if(rightMaskScore == 4){
    rightTemp = 110;
  }else if(rightMaskScore == 5){
    rightTemp = 130;
  }
}

function gameOver(){
  if (leftMaskScore == 5 || rightMaskScore == 5){
    ballSpeedX = 0;
    ballSpeedY = 0;
    maskSpeed = 0;
  }
}



function leftLost(){
  if (leftMaskScore == 5){
    image(viral, 100, height - 300, 200, 130);
  }
}

function rightLost(){
  if (rightMaskScore == 5){
    image(viral, width - 300, height - 300, 200, 130);
  }
}

function playBtn(){
  if (leftMaskScore == 5 || rightMaskScore == 5){
    button = createButton(image(play, width / 2, height / 2, 100, 100));
    button.position(width / 2, height / 2);
    button.mousePressed(reset());
  }
}

function reset(){
  leftMaskScore = 0, rightMaskScore = 0;
  leftTemp = 30;
  rightTemp = 30;
  ballX = width / 2;
  ballY = height / 2;
  ballSpeedX = 3;
  ballSpeedY = 3;
  maskSpeed = 3;
  leftMaskX = 120 - maskW;
  leftMaskY = height / 2 - maskH / 2;
  rightMaskX = width - 120;
  rightMaskY = height  / 2 - maskH / 2;
}

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
