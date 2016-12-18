//Find out the time remaining without p5.js out of simplicity
var end = new Date(2017, 3, 24); //(YEAR,MONTH,DATE,HOUR,MINUTE,SECOND,MILLIS)
var days, minutes, seconds, hours, distance;
var _second = 1000;
var _minute = _second * 60;
var _hour = _minute * 60;
var _day = _hour * 24;

function showRemaining() {
	var now = new Date();
	distance = end - now;
	days = Math.floor(distance / _day - 30); //somehow the calculation is off by 30 days
  hours = Math.floor((distance % _day) / _hour);
	minutes = Math.floor((distance % _hour) / _minute);
	seconds = Math.floor((distance % _minute) / _second);
}


var p5timer;
function setup() {
	p5timer = select('#time');
	frameRate(1);
	noCanvas();
  showRemaining(); //not sure if necessary
}

function draw() {
	showRemaining();
	if (distance <= 0) {
		p5timer.html("I had to give out my Thesis already...");
	} else {

		var countdays = "";
		for (var i = 1; i < days + 1; i++) {
			countdays += "#" + i + "";
		}
		var counthours = "";
		for (var i = 1; i < hours + 1; i++) {
			counthours += "#" + i + "";
		}
		var countminutes = "";
		for (var i = 1; i < minutes + 1; i++) {
			countminutes += "#" + i + "";
		}
		var countseconds = "";
		for (var i = 1; i < seconds + 1; i++) {
			countseconds += "#" + i + "";
		}

    if (days > 0){
      var daystring = "and " + days + " days remaining until I have to hand in my bachelor thesis... <br>"
    }else{
      var daystring = "remaining until I have to hand in my bachelor thesis..."
    }

    if (hours === 1){
      var hourstring = hours + " hour</br>";
    } else{
      var hourstring = hours + " hours</br>";
    }

    if (minutes === 1){
      var minutestring = minutes + " minute</br>";
    } else{
      var minutestring = minutes + " minutes</br>";
    }

    if (seconds === 1){
      var secondstring = seconds + " second </br>"
    } else{
      var secondstring = seconds + " seconds </br>";
    }
		p5timer.html(
      distance / 1000 + "<br>"+
			hourstring +
			minutestring +
			secondstring +
			daystring
		);

	}

}
