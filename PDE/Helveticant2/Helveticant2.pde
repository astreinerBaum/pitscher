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
  antColony = new AntColony (width/2, height/2, 4000); //4000: 25-30fps on my machine
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
    pg.textFont(f);
    pg.textAlign(CENTER, CENTER);
    pg.text(myText,width/2,height/2);
    pg.loadPixels();
  }
  else{
  myText = " ";
  }
  pg.endDraw();
  
  println(textWidth(myText));
  if (debug == true){
    println(frameRate);
    image(pg,0,0); //show Background image
    line(0, height/2-textSize, width, height/2-textSize);
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