/*
This sketch adds 12 hours to the current
time and shows a minimalistic nightsky.
*/

let b, h;

function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB);
    ellipseMode(CENTER)
    noStroke();
}

function draw() {
    h = hour() + 12;
    if(h >= 24) h = h - 24;
    b = h*60 + minute() + second()/60;
    b = map(b, 0, 1440, 0, 255);
    background(210, 100, b);

    fill(50, b, 100)
    ellipse(width/2, height/2, 200, 200);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}