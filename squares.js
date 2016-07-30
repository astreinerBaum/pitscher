var r, g, b, x, y, w, h;
var s = 200;
var num = 0;
var fr = 1;
var sfr = false;

var osc;
var env

function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB);
    frameRate(fr);
    noCursor();

    osc = new p5.Oscillator('sine');
    env = new p5.Env();
    env.setADSR((1/fr)/3, 0.0, (1/fr), (1/fr)/3);
    env.setRange(1/fr, 0.0);
}

function draw() {
    background(0);

    if (num == 0) {
        fill(255);
        textAlign(CENTER);
        text("Press Mouse to Create Rectangle \n Press Up or Down Keys to Change Framerate", windowWidth / 2, windowHeight / 2);
    }

    if (sfr == true) {
        fill(255);
        textAlign(LEFT);
        text("Framerate = " + frameRate(), 10, 20);
    }

    for (var n = 0; n < num; n++) {
        randomize();
        osc.start();
        osc.freq(map(col, 0, 360, 200, 600));
        env.play();
        osc.amp(env);

        for (var i = y; i < h; i++) {
            var gradient = (col + map(i, y, h, 0, 80)) % 360;
            stroke(gradient, 100, 100);
            line(x, i, w, i);
        }

        osc.stop(1 / fr);
    }

}

function randomize() {
    col = random(360);
    x = random(-s, windowWidth);
    y = random(-s, windowHeight);
    w = random(x + s, windowWidth);
    h = random(y + s, windowHeight);
}

function mousePressed() {
    if (mouseButton == LEFT) num++;
    if (mouseButton == CENTER) num--;
}

function keyPressed() {
    if (keyCode == UP_ARROW) {
        fr++
        fr = constrain(fr, 1, 30);
        frameRate(fr);
    } else if (keyCode == DOWN_ARROW) {
        fr--
        fr = constrain(fr, 1, 30);
        frameRate(fr);
    } else if (keyCode == ALT) {
        if (sfr == false) sfr = true;
        else sfr = false;
    }
    return false; // prevent default
}


function showFrameRate() {
    fill(255);
    textAlign(LEFT);
    text("Framerate = " + frameRate(), 10, 20);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
