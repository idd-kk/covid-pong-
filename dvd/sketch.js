// First declare the variable
//int ellipseX;
//float ellipseFloatX;
//String myString;
//Boolean myBool;
let img;

let imageWidth = 100; // width of the image
let imageHeight = 100; // height of the image

let xposition, yposition; // Starting positon of the image

let xspeed = 5; // speed of the image on x-axis
let yspeed = 5; // speed of the image on y-axis

let xdirection = 1;
let ydirection = 1;


function preload(){
  img = loadImage('img/dvdlogo.png');
}

function setup(){
  // Initialize the variable
  // ellipseX = 100; 
  // size(1280,360);
  //fullScreen();
  createCanvas(windowWidth, windowHeight);
  image(img, 0, 0);

  xposition = random(100, width - 100);
  yposition = random(100, height - 100);

  if(random(0,2)<1){
    xdirection = -1;
  }

  if (random(0, 2) < 1) {
    ydirection = -1;
  }
  
  //img = loadImage("dvdlogo.png");
}

function draw(){
  background(0, 0, 0);


  // Update the position of the iamge
  xposition = xposition + (xspeed * xdirection);
  yposition = yposition + (yspeed * ydirection);

  if (xposition > width - imageWidth || xposition < 0) {
    xdirection *= -1;
  }

  if (yposition > height - imageHeight || yposition < 0) {
    ydirection *= -1;
  }

  //println(xposition);
  //println(width);

  //rect(mouseX,mouseY,100,100);
  // Use the variable
  //ellipse(ellipseX,100,50,50);
  image(img, xposition, yposition, imageWidth, imageHeight);
}