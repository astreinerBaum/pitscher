//Find out the time remaining without p5.js out of simplicity
var end = new Date(2017, 3, 23, 23, 59, 59, 99); //(YEAR,MONTH,DATE,HOUR,MINUTE,SECOND,MILLIS)
var days, minutes, seconds, hours, distance;
var _second = 1000;
var _minute = _second * 60;
var _hour = _minute * 60;
var _day = _hour * 24;
var timer;

function showRemaining() {
	var now = new Date();
	distance = end - now;
	if (distance < 0) {
		clearInterval(timer);
		document.getElementById('time').innerHTML = 'EXPIRED!';

		return;
	}
	days = Math.floor(distance / _day);
	hours = Math.floor((distance % _day) / _hour);
	minutes = Math.floor((distance % _hour) / _minute);
	seconds = Math.floor((distance % _minute) / _second);

}


var p5timer;
var p5countdown;

function setup() {
  p5timer = select('#time');
  p5countdown = select('#countdown');
  frameRate(1);
  noCanvas();
}

function draw() {
	showRemaining();
	if (distance <= 0) {
		p5timer.html("I had to give out my Thesis already...");
	} else {

    var countdays = "";
		for (var i = 1; i < days+1; i++) {
			countdays += "#" + i + "";
		}
    var counthours ="";
    for (var i = 1; i < hours+1; i++) {
			counthours += "#" + i + "";
		}
    var countminutes ="";
    for (var i = 1; i < minutes+1; i++) {
			countminutes += "#" + i + "";
		}
    var countseconds ="";
    for (var i = 1; i < seconds+1; i++) {
			countseconds += "#" + i + "";
		}

    p5countdown.html(int(distance / _minute));

		p5timer.html(
      hours +  "&nbsp;&nbsp;&nbsp;&nbsp;hours</br>" +
      minutes + " minutes </br>" +
      seconds+ " seconds </br>" +
      "and <br>"+
      days +
      " days remaining until I have to hand in my bachelor thesis... <br>"
    );

	}

}
