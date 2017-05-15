var end = new Date(2017, 3, 24); //(YEAR,MONTH,DATE,HOUR,MINUTE,SECOND,MILLIS)
var days, minutes, seconds, hours, distance;
var _second = 1000;
var _minute = _second * 60;
var _hour = _minute * 60;
var _day = _hour * 24;
var p5timer;

function setup() {
	p5timer = select('#time');
	frameRate(1);
	noCanvas();
}

function draw() {
	showRemaining();
	if (distance <= 0) {
		p5timer.html("I had to hand in my Thesis already...");
	} else {
		//draw points
		var countdays = "";
		for (var i = 1; i < days; i++) {
			countdays += ".";
		}
		var counthours = "";
		for (var i = 1; i < hours; i++) {
			counthours += ".";
		}
		var countminutes = "";
		for (var i = 1; i < minutes; i++) {
			countminutes += ".";
		}
		var countseconds = "";
		for (var i = 1; i < seconds + 1; i++) {
			countseconds += ".";
		}

    if (days > 0){
      var daystring = "and " + days + " days remaining until I have to hand in&nbsp;my&nbsp;bachelor&nbsp;thesis"
    }else{
      var daystring = "remaining until I have to hand in my bachelor thesis"
    }

    if (hours === 1){
      var hourstring = hours + "&nbsp;hour";
    } else{
      var hourstring = hours + "&nbsp;hours";
    }

    if (minutes === 1){
      var minutestring = minutes + "&nbsp;minute";
    } else{
      var minutestring = minutes + "&nbsp;minutes";
    }

    if (seconds === 1){
      var secondstring = seconds + "&nbsp;second "
    } else{
      var secondstring = seconds + "&nbsp;seconds";
    }
		p5timer.html(
			hourstring + counthours + "<br>" +
			minutestring + countminutes + "<br>" +
			secondstring + countseconds + "<br>" +
			daystring + countdays
		);

	}

}

//Find out the time remaining without p5.js out of simplicity
function showRemaining() {
	var now = new Date(year(),month(),day(),hour(),minute(),second()); //I put the p5 functions inside because otherwise it would give me back a wrong string format
	distance = end - now;
	days = Math.floor(distance / _day);
  hours = Math.floor((distance % _day) / _hour);
	minutes = Math.floor((distance % _hour) / _minute);
	seconds = Math.floor((distance % _minute) / _second);
}
