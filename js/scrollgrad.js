var rows;
function setup(){
  createCanvas(windowWidth, windowHeight);
	colorMode(HSB,360,100,100);
  background(0);
  rows = 10;
  noStroke();
}

var index = 0;
function draw(){
  for (var i = 0; i < windowHeight; i+=rows) {
    var gradient = (i / windowHeight * 20 + index) % 360;
    fill(gradient, 70, 100);
    rect(0, i-rows, windowWidth, i);
  }

}

function mouseWheel() {
  index++;
  return false;
}

function touchMoved() {
  index++;
  //return false;
}
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
