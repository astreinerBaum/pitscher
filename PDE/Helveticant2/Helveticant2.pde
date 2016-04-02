/*   
     HELVETICANT 
     by Matthias Pitscher
     Final assignment for the class Wild Type
     at the Bauhaus University Weimar 2016
     This work is licensed under a Creative Commons Attribution-ShareAlike 3.0 Unported License
     http://creativecommons.org/licenses/by-sa/3.0/
*/

//HOWTO: Use keyboard to write, Backspace to delete
//       Press Mouse for Debug Mode

AntColony antColony;
PGraphics pg;
//PFont f;
boolean debug = false;
String myText = " ";
int textSize;

void setup() {
  textSize = 100;
  size(700, 700);
  frameRate(30); //fix to 30 so they won't get to fast if you have a small population
  smooth();
  //load an Ant Colony at x,y and a Population
  antColony = new AntColony (width/2, height/2, 500); //4000: 25-30fps on my machine
  //load "Background image" with the font
  pg = createGraphics(width, height);
  //f = createFont("Helvetica.ttf", textSize);
  
  
}

void draw() {
  background(255);
  
  //Draw background 
  pg.beginDraw();
  if (myText.length() > 0) {
    pg.background(255);
    pg.fill(0);
    pg.textSize(72);
    //pg.textFont(f);
    pg.textAlign(CENTER, CENTER);
    pg.text(myText,width/2,height/2);
    pg.loadPixels();
  }
  else{
  myText = " ";
  }
  pg.endDraw();
  
  //println(textWidth(myText));
  if (debug == true){
    println(frameRate);
    image(pg,0,0); //show Background image
    //line(0, height/2-textSize, width, height/2-textSize);
  }
  antColony.run();
  pg.updatePixels(); 
  
}

void mousePressed(){
  if (debug == false)debug = true;
  else debug = false;
}

//KEYS
void keyPressed() {
  if (key !=CODED) {
    switch(key) {
    case DELETE:
    case BACKSPACE:
      myText = myText.substring(0, max(0, myText.length()-1));
      break;
    case ENTER:

      break;
    default:
      myText += key;
    }
  }
}

class AntColony {
  Ant[] ants; //create an array of ants
  int x;
  int y;
  int count;

  AntColony(int _x, int _y, int _count) {
    x = _x;
    y = _y;
    count = _count;
    ants = new Ant[count]; //create a number of ants
    for (int i = 0; i < count; i++) { //
      ants[i] = new Ant(x, y);
      
    }
  }
  
  void run(){
    for (int i = 0; i < count; i++){
      ants[i].run();
    }
  
  }
}

class Ant {
  PVector location;
  PVector velocity;
  PVector acceleration;
  float r;
  float maxspeed;

  Ant(float x, float y) {
    location = new PVector(x, y);
    velocity = PVector.random2D(); //start with a random direction
    acceleration = new PVector(0, 0);
    r = 1;                         //size (in px)
  }
  
  //bundle everything and run them in order
  void run() {
    stayInside(80);
    randomWalk(20);
    step();
    display(location.x,location.y);
    checkEdges();
  }

  void step() {
    velocity.add(acceleration);
    location.add(velocity);
    velocity.limit(maxspeed);
    acceleration.mult(0);
    maxspeed = 3;                //max speed for normal task
  }
  
  //change to a random direction %percent% of the time
  void randomWalk(float percent) {
    if (random(1) < percent/100) {
      applyForce(PVector.random2D());
    }
  }
  
  //If an Ants location is black in the background image and the future location is white the ant turns around %percent% of the time
  void stayInside(float percent) {
    //color locColor = pg.get(int(location.x), int(location.y));
    //color futColor = pg.get(int(futureLoc().x), int(futureLoc().y));
    color locColor = color(255);
    int pixelVal = int(location.y)*width+int(location.x);
    
    if( pixelVal < width*height && pixelVal >= 0){
      locColor = pg.pixels[pixelVal];
    }
    if (locColor != -1) {
      fill(0);
      if (random(1) < percent/100) {
        maxspeed = 0.5;               //if inside Letter change speed to slow
        color futColor = pg.pixels[int(futureLoc().y)*width+int(futureLoc().x)];
        if (futColor == -1) {
          //check edge and go in opposit direction | Quick and Dirty but it works | better would be to turn 90 degrees
          velocity.mult(-1);
        }
      }
    } else fill(0);
  }

  PVector futureLoc() {
    float d = 1;                //distance in pixel
    PVector loc = velocity.get();      // Start with velocity
    loc.normalize();            // Normalize to get heading
    loc.mult(d);                // Multiply by distance
    loc.add(location);          // Make it relative to ant's location

    return loc;
  }
  
  void applyForce(PVector force) {
    acceleration.add(force);
  }

  //Pheromone (not in use) 
  void leaveTrail() {
    
  }

  //DRAWING THE ANT
  //I would like to make an ant out of 2-3 body segments
  void display(float x, float y) {
    float theta = velocity.heading2D() + radians(90); //find out the rotation 
    noStroke();
    pushMatrix();
    translate(x, y);
    rotate(theta);
    beginShape();
    vertex(-r, r*2);
    vertex(r, r*2);
    vertex(r, -r);
    vertex(-r, -r);
    endShape();
    popMatrix();
  }
  
  void checkEdges() {
    PVector fuLoc = futureLoc();
    //BOUNCE OF EDGES
    if (fuLoc.x + r > width)velocity.x *= -1;
    if (fuLoc.x - r < 0)velocity.x *= -1;
    if (fuLoc.y + r > height)velocity.y += -1;  
    if (fuLoc.y - r < 0)velocity.y *= -1;
  }
}