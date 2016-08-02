var balls = [];
var minR = 20;
var maxR = 120;
var col;
var osc, env;

var attackLevel = 1.0;
var releaseLevel = 0;

var attackTime = 0.001
var decayTime = 0.2;
var susPercent = 0.2;
var releaseTime = 0.5;

function setup() {
	createCanvas(windowWidth, windowHeight);
	colorMode(HSB);
	
	env = new p5.Env();
	env.setADSR(attackTime, decayTime, susPercent, releaseTime);
  	env.setRange(attackLevel, releaseLevel);
	
	for (var i = 0; i < 10; i++) {
		balls.push(new Ball(createVector(random(maxR, width - maxR), random(maxR, height - maxR)), random(minR, maxR)));
		}
	}

	function draw() {
		background(col, 50, 100);
		for (var i = 0; i < balls.length; i++) {
			balls[i].run();
		}
	}

	function mousePressed() {
		balls.push(new Ball(createVector(constrain(mouseX, maxR, width - maxR), constrain(mouseY, maxR, height - maxR)), random(minR, maxR)));
	}

	function Ball(location, radius) {
		this.radius = radius;
		this.location = location.copy();
		this.velocity = createVector(random(-1, 1), random(-1, 1));
		this.acceleration = createVector(0, 0.05);
		this.maxspeed = 1;
		this.ballCol = random(360);
		
		this.osc = new p5.Oscillator('sine');
		
		this.run = function () {
			this.update();
			this.checkEdges();
			//this.randomPush(2);
			this.display();
		};
		this.update = function () {
			this.velocity.add(this.acceleration);
			this.location.add(this.velocity);
			this.velocity.limit(this.maxspeed);
			this.acceleration.mult(0);
		};
		this.display = function () {
			noStroke();
			fill(this.ballCol,100,100);
			ellipse(this.location.x, this.location.y, this.radius, this.radius);
		};
		this.randomPush = function (percent) {
			if (random(0, 1) < percent / 100) {
				this.acceleration.add(random(-0.6, 0.6), random(-0.6, 0.6));
			}
		};
		this.checkEdges = function () {
			if (this.location.x + this.radius / 2 > width) {
				this.velocity.x *= -1;
				col = random(360);
				this.makeSound();
			}
			if (this.location.x - this.radius / 2 < 0) {
				this.velocity.x *= -1;
				col = random(360);
				this.ballCol = col;
				this.makeSound();
			}
			if (this.location.y + this.radius / 2 > height) {
				this.velocity.y *= -1;
				col = random(360);
				this.ballCol = col;
				this.makeSound();
			}
			if (this.location.y - this.radius / 2 < 0) {
				this.velocity.y *= -1;
				col = random(360);
				this.ballCol = col;
				fill(this.ballCol,100,100);
				this.makeSound();
			}
		};
		this.makeSound = function () {
			this.osc.start();
			this.osc.freq(map(this.radius, minR, maxR, 800, 150));
			env.play();
			this.osc.amp(env);
			this.osc.stop(attackTime+decayTime+releaseTime);
		}
	}

	function windowResized() {
		resizeCanvas(windowWidth, windowHeight);
	}