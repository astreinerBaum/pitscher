var timer;
function setup() {
  timer = select('#time');
}

function draw() {
  var hoursleft;
  timer.html(day()+':'+month()+':'+year());

}
