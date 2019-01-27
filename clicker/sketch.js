/*
pitscher.net
Clicker Game for
Sankt Interface
*/


let num = 0;
let countdown;
let stopCounting = false;
let countdownSet = false;
let firstClick   = false;

let countdownDOM, numberDOM, additionalTextDOM, hatemel;
let gameState, avgSpeed;
let waitForRestart;

const COUNTDOWNSECONDS = 15

function setup() {
  noCanvas(); // I interact directly with the DOM Elements

  //Selecting all DOM Elements I want to change
  countdownDOM = select('#countdown');
  numberDOM = select('#clickerNumber');
  additionalTextDOM = select('#additionalText');
  highscoreDOM = select('#highscore');
  tryAgainBtn = select('#tryAgain');
  tryAgainBtn.mouseClicked(startGame);

  //Changing the cursor style
  hatemel = select('html');
  hatemel.addClass('cursor');

  startGame();
  firstClick = true;
}

function draw() {
  //  drawBackground();
  if (gameState == 0) {
    num = 0;
    additionalTextDOM.html('CLICK TO START');
    console.log("gamestate 000");
  }

  if (gameState == 1) {
    additionalTextDOM.html('&nbsp;');
    numberDOM.html(num.toString());

    let colorCountdown = map(countdownTimer(), 15, 0, 140, 0);
    let decimalTime = countdownTimer().toString().split(".");
    if (decimalTime[1] == null) decimalTime[1] = "00";
    if (decimalTime[1] < 10) decimalTime[1] = "0" + decimalTime[1];
    if (decimalTime[0] == null) decimalTime[0] = "00";
    if (decimalTime[0] < 10) decimalTime[0] = "0" + decimalTime[0];


    countdownDOM.style('color', 'hsl(' + colorCountdown + ', 80%, 40%)')
    countdownDOM.html(decimalTime[0] + ":" + decimalTime[1].substr(0, 2));

    if (countdownTimer() == 0) {
      gameState++;
      waitForRestart = millis() + 2000;
      stopCounting = true;
      countdown = false;
      avgSpeed = num / COUNTDOWNSECONDS;
      highscore(num);
    }
  }

  if (gameState == 2) {
    countdownDOM.html('');
    additionalTextDOM.html('YOUR SCORE!</br><span class=\'small\'> ' + avgSpeed.toString().substr(0, 3) + ' clicks / second </span>');
    
    //wait for 2 seconds and make restart button visible
    if(millis() >= waitForRestart){
      tryAgainBtn.style('visibility', 'visible');
    }
  }

}

function startGame() {
  num = 0;
  numberDOM.html(num.toString());
  additionalTextDOM.html('&nbsp;');
  countdownDOM.html('&nbsp;');
  tryAgainBtn.style('visibility', 'hidden');
  firstClick = false;
  stopCounting = false;
  countdownSet = false;
  gameState = 0;
}


function countdownTimer() {
  let cd = countdown - millis();
  if (cd > 0) {
    return cd / 1000; //returns seconds instead of milliseconds
  } else {
    return 0
  }
}

function setCountdown(s){
  countdown = millis() + s*1000;
}


function mousePressed() {
  //Change mouse style
  hatemel.addClass('cursor-down');
  hatemel.removeClass('cursor')
}

function mouseReleased() {
  // change mouse style
  hatemel.addClass('cursor');
  hatemel.removeClass('cursor-down');
}

function mouseClicked(){
    if (gameState == 0 && firstClick == true){
      gameState++;
      //num++;
    }

    if (!firstClick){
      firstClick = true;
    }

    if (gameState == 1) {
      if (!countdownSet) {
        setCountdown(COUNTDOWNSECONDS);
        countdownSet = true;
      }
  
      if (!stopCounting) {
          num++;
      }
    }
}


let hsConstrain;
let highscoreList = []; //This is how you define an empty array in JS
function highscore(n) {
  highscoreList.push(n);
  highscoreList.sort(function(a, b){return b-a});
  let list = '';

  if(highscoreList.length >= 10){
    hsConstrain = 10
  } else {
    hsConstrain = highscoreList.length;
  }

  for (let i = 0; i < hsConstrain; i++) {
    list += '<li>' + highscoreList[i] + '</li>';
  }
  highscoreDOM.html(list);
}