var ants = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	for (var i = 0; i < 200; i++) {
		ants.push(new Ant(createVector(random(width), random(height)), 3));
	}
}

function draw() {
	background(245);
	for (var i = 0; i < ants.length; i++) {
		ants[i].run();
	}
}

function mousePressed() {
	ants.push(new Ant(createVector(mouseX, mouseY), 10));
}

function Ant(location, radius) {
	this.radius = radius;
	this.location = location.copy();
	this.velocity = createVector(random(-1, 1), random(-1, 1));
	this.acceleration = createVector(0, 0.05);
	this.maxspeed = 1;
	this.history = [];
	
	this.run = function () {
		this.update();
		this.checkEdges();
		this.randomPush(99);
		this.display();
	};
	this.update = function () {
		this.history.push(this.location);
		if (this.history.length > 100) {
			this.history.splice(0, 1);
		}
		
		this.velocity.add(this.acceleration);
		this.location.add(this.velocity);
		this.velocity.limit(this.maxspeed);
		this.acceleration.mult(0);
		
	};
	this.display = function () {
		fill(0);
		ellipse(this.location.x, this.location.y, this.radius/1.2, this.radius/1.2);
		ellipse(this.location.x - this.velocity.x * this.radius*2,
				this.location.y - this.velocity.y * this.radius*2,
				this.radius,
				this.radius );
		ellipse(this.location.x - this.velocity.x * (this.radius),
				this.location.y - this.velocity.y * (this.radius),
				this.radius/1.5,
				this.radius/1.5 );

	};
	this.randomPush = function (percent) {
		if (random(0, 1) > percent / 100) {
			this.acceleration.add(random(-0.6, 0.6), random(-0.6, 0.6));
		}
	};
	this.checkEdges = function () {
		if (this.location.x + this.radius / 2 > width) this.velocity.x *= -1;
		if (this.location.x - this.radius / 2 < 0) this.velocity.x *= -1;
		if (this.location.y + this.radius / 2 > height) this.velocity.y *= -1;
		if (this.location.y - this.radius / 2 < 0) this.velocity.y *= -1;
	};
}