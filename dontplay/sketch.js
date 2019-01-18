let btn;
let txt;
let countdown = 60000;
let lost = false;

function setup() {
  noCanvas();
  btn = select('#button');
  btn.mouseReleased(endGame);
  txt = select('#text');
}

function draw () {
  if (lost){
    if (countdownTimer() <= 0.001) {
      winGame();
    }
  }
}

function endGame() {
  txt.html("Sorry, You Lost <br> the Game.");
  txt.style("color", "white");
  btn.remove();
  document.body.setAttribute("style", "background-color: red;");
  lost = true;
}

function winGame() {
  txt.html("You Won!");
  txt.setAttribute("color", "white");
  document.body.setAttribute("style", "background-color: green;");
  btn.remove();
}

function countdownTimer() {
  let cd = countdown - millis();
  if (cd > 0) {
    return cd / 1000;
  } else {
    return 0
  }
}

function mouseMoved(){
  countdown = millis() + 10*(60*1000); //10 minutes without moving mouse
}

/*
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
*/