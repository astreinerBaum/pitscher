var balls = [];		//array of balls
var minR  = 20;		//minimum radius
var maxR  = 120;	//maximum radius
var col;		//background color

// generate sound
var osc, env;
var attackLevel = 1.0;
var releaseLevel = 0;
var attackTime = 0.001;
var decayTime = 0.2;
var susPercent = 0.2;
var releaseTime = 0.5;

function setup() {
	createCanvas(windowWidth, windowHeight);
	colorMode(HSB);

	env = new p5.Env();
	env.setADSR(attackTime, decayTime, susPercent, releaseTime);
  	env.setRange(attackLevel, releaseLevel);

	//In the beginning God created 10 Balls with random size at a random location
	for (var i = 0; i < 10; i++) {
		balls.push(new Ball(
				createVector(
					random(maxR, width - maxR),
					random(maxR, height - maxR)
					),
				random(minR, maxR)
				)
			);
		}
	}

	function draw() {
		background(col, 50, 100);
		for (var i = 0; i < balls.length; i++) {
			balls[i].run();
		}
	}

	//push a new Ball at mouselocation in the balls array when mouse is pressed
	function mousePressed() {
		balls.push(
			new Ball(
				createVector(
					constrain(mouseX, maxR, width - maxR),
					constrain(mouseY, maxR, height - maxR)
					),
			random(minR, maxR)
			)
		);
	}

	//Here starts the definition of a Ball. A Ball needs a location (Vector) and a size (radius)
	function Ball(location, radius) {
		this.radius = radius;
		this.location = location.copy();
		this.velocity = createVector(random(-1, 1), random(-1, 1));	//A Ball goes in a random direction
		this.acceleration = createVector(random(-0.05, 0.05), random(-0.05, 0.05));
		this.maxspeed = 1;						//A Ball does not exceed maxspeed
		this.ballCol = random(360);					//A Ball gets a random color

		this.osc = new p5.Oscillator('sine');				//A Ball gets it's own Oscillator

		//run the following Ball.functions in with this neat function
		this.run = function () {
			this.update();
			this.checkEdges();
			this.display();
		};

		//Let the Ball move around the screen
		this.update = function () {
			this.velocity.add(this.acceleration);
			this.location.add(this.velocity);
			this.velocity.limit(this.maxspeed);
			this.acceleration.mult(0);
		};

		//Let the ball be shown on the screen
		this.display = function () {
			noStroke();
			fill(this.ballCol,50,100);
			ellipse(this.location.x, this.location.y, this.radius, this.radius);
		};

		//Let the Ball not get off the screen
		this.checkEdges = function () {
			if (this.location.x + this.radius / 2 > width) {
				this.velocity.x *= -1;
				col = this.ballCol;
				this.makeSound();
			}
			if (this.location.x - this.radius / 2 < 0) {
				this.velocity.x *= -1;
				col = this.ballCol;
				this.makeSound();
			}
			if (this.location.y + this.radius / 2 > height) {
				this.velocity.y *= -1;
				col = this.ballCol;
				this.makeSound();
			}
			if (this.location.y - this.radius / 2 < 0) {
				this.velocity.y *= -1;
				col = this.ballCol;
				this.makeSound();
			}
		};

		//Let the ball make sound depending on it's size
		this.makeSound = function () {
			this.osc.start();
			this.osc.freq(map(this.radius, minR, maxR, 800, 150));
			env.play();
			this.osc.amp(env);
			this.osc.stop(attackTime+decayTime+releaseTime);
		};
	}

	//resize the sketch when the window gets resized
	function windowResized() {
		resizeCanvas(windowWidth, windowHeight);
	}
