let btn;
let txt, subtxt;
let lost = false;
let gameState = 0;
let targetSet = false;

let xOffset, yOffset;
let targetX, targetY;
let movesX, movesY;

let range = 1;
let highscoreTxt;
let highscore = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  btn = select('#button');
  btn.mouseReleased(startGame);
  txt = select('#text');
  subtxt = select('#subtext');
  highscoreTxt = select('#highscore');
}

let horSign, verSign;
function draw () {
  if (gameState == 1){
    movesX = targetX - mouseX;
    movesY = targetY - mouseY;

    if (movesX < 0) horSign = "&#x2B05;";
    if (movesX == 0) horSign = "☑";
    if (movesX > 0) horSign = "&#x27A1;";

    if (movesY < 0) verSign = "&#x2B06;";
    if (movesY == 0) verSign = "☑";
    if (movesY > 0) verSign = "&#x2B07;";

    txt.html("Level " + range + "<br>" + horSign + " " + abs(movesX) + "<br>" + verSign + " " + abs(movesY) );
    
    if (movesX == 0 && movesY == 0){
      range++;
      targetSet = false;
      startGame();
    }

    checkMoveBoundary();
  }
  
}

function checkMoveBoundary(){
  if (xOffset < 0 ){
    //console.log("mx: " + mouseX + " - tx: " + targetX);
    if (mouseX > pmouseX) endGame(0, 0);
    if (movesX > 0) endGame(1, 0);
  }
  if (xOffset == 0){
    if(movesX != 0) endGame(0, 0);
  }
  if (xOffset > 0 ){
    //console.log("mx: " + mouseX + " - tx: " + targetX);
    if (mouseX < pmouseX) endGame(0, 0);
    if (movesX < 0) endGame(1, 0);
  }
  if (yOffset < 0 ){
    if (mouseY > pmouseY) endGame(0, 1);
    if (movesY > 0) endGame(1, 1);
  }
  if (yOffset == 0){
    if(movesY != 0) endGame(0, 1);
  }
  if (yOffset > 0 ){
    if (mouseY < pmouseY) endGame(0,1);
    if (movesY < 0) endGame(1,1);
  }
}

function checkMoveBoundaryPlusOne(){
  if (xOffset < 0 ){
    //console.log("mx: " + mouseX + " - tx: " + targetX);
    if (mouseX > pmouseX + 1) endGame(0, 0);
    if (movesX > 0 + 1) endGame(1, 0);
  }
  if (xOffset == 0){
    //if(movesX != 0) endGame(0, 0);
    if(movesX < -1) endGame(0, 0);
    if(movesX > 1) endGame(0, 0);
  }
  if (xOffset > 0 ){
    //console.log("mx: " + mouseX + " - tx: " + targetX);
    if (mouseX < pmouseX - 1) endGame(0, 0);
    if (movesX < 0 - 1) endGame(1, 0);
  }
  if (yOffset < 0 ){
    if (mouseY > pmouseY +1) endGame(0, 1);
    if (movesY > 0 + 1) endGame(1, 1);
  }
  if (yOffset == 0){
    //if(movesY != 0) endGame(0, 1);
    if(movesY < -1) endGame(0, 1);
    if(movesY > 1) endGame(0, 1);
  }
  if (yOffset > 0 ){
    if (mouseY < pmouseY -1) endGame(0,1);
    if (movesY < 0 -1) endGame(1,1);
  }
}


function startGame() {
  gameState = 1;
  if (!targetSet) setTarget();
  
  txt.html("");
  subtxt.hide();
  btn.hide();
}

function endGame(reason, direction){
  setHighscore(range);
  gameState = 0;
  targetSet = false;
  txt.html("Level " + range + "<br>You Lost.");
  
  if(reason == 0) subtxt.html("<br>Wrong Direction.");
  if(reason == 1) subtxt.html("<br>A bit too far.");
  if(reason == 2) subtxt.html("<br>Windowsize changed");
  if(direction == 0) subtxt.html("<br> <span style='color: red'>" + horSign + " " + abs(movesX) + "</span>", true);
  if(direction == 1) subtxt.html("<br> <span style='color: red'>" + verSign + " " + abs(movesY) + "</span>", true);

  btn.html("TRY AGAIN?");
  btn.show();

  btn.mouseReleased(function(){
    background(255);
    range = 1;
    startGame();
  });
  subtxt.show();
  lost = true;
}

function setTarget(){
  if (gameState == 1){
    xOffset = round(random(-range, range));
    yOffset = round(random(-range, range));
    targetX = mouseX + xOffset;
    targetY = mouseY + yOffset;
    if (targetX >= windowWidth || targetX <= 0 || targetY >= windowHeight || targetY <= 0){
      setTarget();
      return;
    } 
    targetSet = true;
  }
}

function mouseMoved(){
  if( gameState == 1){
    point(mouseX, mouseY);
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  endGame(2);
}


function setHighscore(n) {
  if (n > highscore){
    highscore = n;
    highscoreTxt.html("Level " + highscore);
  }
}