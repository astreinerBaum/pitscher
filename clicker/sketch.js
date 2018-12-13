let num = 0;
let countdown;
let firstClick = false;
let veryFirstClick = false;
let yourScoreTimeOut = false;
let stopCounting = false;
let restartClick = false;
let countdownSet = false;

let countdownDOM, numberDOM, additionalTextDOM, hatemel;
let gameState, avgSpeed;

let cnv;

function setup() {
  //  cnv = createCanvas(windowWidth, windowHeight);
  //  cnv.id('canvas');
  noCanvas();
  countdownDOM = select('#countdown');
  numberDOM = select('#clickerNumber');
  additionalTextDOM = select('#additionalText');
  highscoreDOM = select('#highscore');
  tryAgainBtn = select('#tryAgain');
  hatemel = select('html');
  hatemel.addClass('cursor');

  start();
}

function draw() {
  //  drawBackground();
  if (gameState == 0) {
    num = 0;
    additionalTextDOM.html('CLICK TO START');
    hatemel.mouseClicked(function () {
      gameState++;
      num++;
    });
  }

  if (gameState == 1) {
    if (!countdownSet) {
      countdown = millis() + 15000;
      countdownSet = true;
    }

    if (!stopCounting) {
      hatemel.mouseClicked(function () {
        num++;
      });
    }

    additionalTextDOM.html('&nbsp;');
    numberDOM.html(num.toString());

    let colorCountdown = map(countdownTimer(), 15, 0, 140, 0);
    let cTime = ceil(countdownTimer());
    let decimalTime = countdownTimer().toString().split(".");
    if (decimalTime[1] == null) decimalTime[1] = "00";
    if (decimalTime[1] < 10) decimalTime[1] = "0" + decimalTime[1];
    if (decimalTime[0] == null) decimalTime[0] = "00";
    if (decimalTime[0] < 10) decimalTime[0] = "0" + decimalTime[0];


    countdownDOM.style('color', 'hsl(' + colorCountdown + ', 80%, 40%)')
    countdownDOM.html(decimalTime[0] + ":" + decimalTime[1].substr(0, 2));

    if (countdownTimer() <= 0.001) {
      gameState++;
      stopCounting = true;
      countdown = false;
      avgSpeed = num / 15;
      highscore(num);
    }
  }

  if (gameState == 2) {
    countdownDOM.html('');
    additionalTextDOM.html('YOUR SCORE!</br><span class=\'small\'> ' + avgSpeed.toString().substr(0, 3) + ' clicks / second </span>');
    tryAgainBtn.style('visibility', 'visible');
    tryAgainBtn.mouseClicked(start);
  }

}


function start() {
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
    return cd / 1000;
  } else {
    return 0
  }
}

// Make cursor to gif
function mousePressed() {
  hatemel.addClass('cursor-down');
  hatemel.removeClass('cursor')
}

function mouseReleased() {
  hatemel.addClass('cursor');
  hatemel.removeClass('cursor-down');
}

let highscoreList = [];

function highscore(n) {
  highscoreList.push(n);
  highscoreList.sort(function(a, b){return b-a});
  let list = '';
  for (let i = 0; i < highscoreList.length; i++) {
    list += '<li>' + highscoreList[i] + '</li>';
  }
  highscoreDOM.html(list);
}