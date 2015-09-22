// GET GOOGLE IMAGES SEARCH RESULTS
// I use the ajax.googleapis.com json search results to fetch the image
// urls into a string array and display them one at a time
//
// Youssef Faltas, Feb 2014
// Matthias Schäfer, Mai 2014 - Sep 2015
// Added search library, random text generator & random font creator 
// After opening it might take a while to convert .ttf (truetypefont) to .vlw (something bitmap)
// Known Bug: >>JSONObject["responseData"] is not a JSONOBject<< after too many search requests 

//HOW TO
//Mouseclick to load new random Cover and Bandname
// SPACE to save in /Cover/

import java.io.File; 
import java.io.FilenameFilter;
import java.util.ArrayList;
import java.util.Arrays;
import java.nio.file.Paths;


PImage img;

File myFile;
File imageFile;
String myFileName = "slangdict.txt";        //load slang words for Bandname
String myImageName = "funnywords.txt"; //"50randomnames.txt"; "500randomwords.txt"; "slangdictsearch.txt"; "funnywords.txt"; //load google image search keywords Other: 
int myFileLines;
int myImageLines;
String input[];
String imageInput[];

int numofResults = 20;                  // choose a multiple of four
float avgH, avgS, avgB, avgR, avgG;     //color HSB or RGB

String searchTerm; 
String[] imgUrls = new String[0];
String[] links = new String[0];
JSONArray results;
JSONObject response;


PFont mono;
ArrayList<PFont> fonts;

ArrayList<PFont> createFontListFromDirectory (String fontDir) throws Exception {
  File dir = new File(dataPath(fontDir));

  if (!dir.exists()) {
    throw new Exception();
  }

  ArrayList<File> files = new ArrayList<File>(Arrays.asList(dir.listFiles(new FilenameFilter() {
    public boolean accept( File dir, String filename) {
      return filename.endsWith(".ttf");
    }
  }
  )));

  ArrayList<PFont> result = new ArrayList<PFont>();
  for (File file : files) {
    result.add(createFont(file.toString(), 64));
  }

  return result;
}

PFont sampleRandomFontFromTable (ArrayList<PFont> table) {
  return table.get(floor(random(0, table.size())));
}

void setup()
{
  size(600, 600);
  myFile = new File(sketchPath(myFileName));
  imageFile = new File (sketchPath(myImageName));
  if (myFile.exists() && imageFile.exists()) {
    // load the whole file into the memory stored by a String Array.
    input = loadStrings(myFileName); 
    imageInput = loadStrings(myImageName);
    println("datei " +myFileName + " existiert.");
    println("datei " +myImageName + " existiert.");
  } else {
    println("datei " +myFileName + " existiert nicht.");
  }
  myImageLines = imageInput.length;
  myFileLines = input.length;

  //Fonts
  mono = loadFont("Monospaced-48.vlw");
  
  try {
    fonts = createFontListFromDirectory("");
  } 
  catch (Exception e) {
    println("font folder could not be found!");
  }
}

void draw() {
  int i = int(random(1, 20));            // Random Picture 
  //if ( i == numofResults ) i = 0 ;     // starting over when we reach the final result

  if (mousePressed) {                    // display a new image when mouse is pressed

    int random = int(random(0, myImageLines));
    int r1 = int(random(0, myFileLines));
    int r2 = int(random(0, myFileLines));
    searchTerm  = imageInput[random];
    links = img_urls(numofResults/4);     // returns an array of image url strings
    println(searchTerm);
    img = loadImage(links[i], "jpg");
    if (img != null ) { 
      image(img, 0, 0, width, height);    // display and fit image to display window

      //calculate 
      String labelString = input[r1] +"\n"+input[r2];

      int baseLine = height/2;

      loadPixels();
      // Begin our loop for every pixel in the second half of image
      for (int x = 0; x < width; x++) {
        for (int y = baseLine; y < height; y++) {
          int loc = x + y * width;
  
          avgH += hue(pixels[loc]);
          avgS += saturation(pixels[loc]);
          avgB += brightness(pixels[loc]);
          
          /*                            //Uncomment for RGB Mode
          avgR += red(pixels[loc]);;
          avgG += green(pixels[loc]);
          avgB += blue(pixels[loc]);
          */
        }
      }
      updatePixels();
      //Calculate average color HSB
      avgH = avgH / (width*(height-baseLine));
      avgS = avgS / (width*(height-baseLine)); 
      avgB = avgB / (width*(height-baseLine)); 
      //Invert HSB 
      float invH = (avgH + 180)%360;
      //float invS = (avgS + 50)%100;       //inverted Saturation not in use
      float invB = (avgB + 50)%100;
      //println(avgHue);
      
      
      /* Calculate average color RGB
      avgR = avgR / ((x2-x1)*100); 
      avgG = avgG / ((x2-x1)*100); 
      avgB = avgB / ((x2-x1)*100); 
      println(avgR, avgG, avgB);
      //Invert RGB
      float invR = 255-avgR;
      float invG = 255-avgG;
      float invB = 255-avgG;
      */
      
      //Output Text
      textSize(60);
      textAlign(CENTER);
      textFont(sampleRandomFontFromTable(fonts));
      colorMode(HSB, 360, 100, 100);
      fill(avgH,avgS,avgB);                  //Average Everything TextBorder (Better readability)
      text(labelString, 0+2, baseLine+2, width, height);
      text(labelString, 0-2, baseLine-2, width, height);
      fill(invH, avgS, invB);               //Invert Hue and Brightness for TextColor
      //fill(avgR, avgG, avgB);
      text(labelString, 0, baseLine, width, height);
      
    } else {
      //colorMode(RGB);
      background(0);
      fill(255);
      textSize(48);
      textAlign(CENTER);
      textFont(mono);
      text("Could not load image"+"\n"+"try again!", width/2, height/2);
    }
  }
}


String[] img_urls(int fours)
{
  String[] url = new String[fours];
  String[] links = new String[4*fours];

  for (int t=0; t<fours; t++)
  {       
    url[t] = "https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q="+searchTerm+"&start="+(t*4)+"&as_filetype=jpg&tbs=isz:l"; //ift:jpg,isz:m";
    println(url[t]);
    // find more search arguments here
    // https://developers.google.com/image-search/v1/jsondevguide#json_args

    response = loadJSONObject(url[t]);
    //println(response);
    JSONObject responseData = response.getJSONObject("responseData");
    if (responseData != null ) {
      results = responseData.getJSONArray("results");

      for (int i = 0; i < results.size (); i++) {

        JSONObject result = results.getJSONObject(i);

        int high = result.getInt("height");
        int wide = result.getInt("width");
        String linkstring = result.getString("unescapedUrl");
        links[(i+(4*t))] = linkstring;
        //println("Photo has height " + high + " and width " + wide + " is at ");
        //println(linkstring);
      }
    }else println("Suspected Terms of Service Abuse.");
  }   
  return links;
}

void keyPressed() {
  // SPACE to save
  if(keyCode == 32) {
    saveFrame("cover/####.jpg");
  } 
}

