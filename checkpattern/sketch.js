let cam;
let rectSize = 5; //must be odd

function setup() {
  var canvas = createCanvas(640, 480);
  canvas.parent('sketch');
  imageMode(CENTER);
  cam = createCapture(VIDEO);
  cam.size(width, height)
  noStroke();
  cam.hide();
}

function draw() {
  for (let v = 0; v < height; v += rectSize) {
    for (let h = 0; h < width; h += rectSize) {
      if ((h + v) % (rectSize*2) == 0) {
        fill(255);
      } else {
        fill(0);
      }
      rect(h, v, rectSize, rectSize);
    }
  }

  image(cam, width/2, height/2, width, height);
  //filter(GRAY);
  tint(255, 50);

}

function windowResized() {
  //resizeCanvas(windowWidth, windowHeight);
}
