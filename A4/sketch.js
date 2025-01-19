//Daniel Shiffman
//https://youtu.be/E4RyStef-gY
//https://p5js.org/reference/#/p5/millis
//Sound
//https://www.salamisound.de/5435109-wasser-troepfelt-schnell-aus
//https://p5js.org/examples/sound-load-and-play-sound.html
//Tropfen
//https://editor.p5js.org/samchasan/sketches/SJfzWJviW
//Eimer
//https://p5js.org/reference/#/p5/vertex
//Input
//https://p5js.org/examples/dom-input-and-button.html
//https://p5js.org/reference/#/p5/split
//Recherche für Uhren für Ideenfindung
//https://www.homenish.com/types-of-clocks/
//https://onaircode.com/javascript-js-clock-code-examples/
//https://create.arduino.cc/projecthub/john-bradnam/domino-clock-d2f195?ref=user&ref_id=466812&offset=0
//http://www.arminlinder.de/programming/javascript/hourglass/hourglass_test.html
//https://github.com/Chalarangelo/starclock-js
//fiktive Eimeruhr wird durch füllstand von Wasser gemessen (Eigenkreation)
//Tropfen füllt Eimer, der dann voll wird und seinen Inhalt in den nächsten Eimer kippt

var water;
let input;
let ms = 0;
var dropY = 0;
var dropX = 140;

function preload() {
  water = loadSound('sound.mp3');
}

function mousePressed(){ //Sound spielt nur beim gedrückt lassen, weil es sonst nervt XD
    water.play();
}

function mouseReleased(){
    water.stop();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  
  water.loop();

  clock = new Clock();
  ms = round(millis());
  
  input = createInput();
  input.position(20,20);
  input.value('2022:23:55:45');
  button = createButton('submit');
  button.position(input.x + input.width, input.y);
  button.mousePressed(getinput);
}

function getinput(){
  const timer = split(input.value(),':');
  input.value('');
  trigger = true;
  //ich habe jetzt nicht jede fehlerhafte Eingabemöglichkeit überprüft
  if(timer[3] <= 59 || timer[3] >= 0 ) clock.setsc(int(timer[3])); //sec
  if(timer[2] <= 59 || timer[2] >= 0 ) clock.setmn(int(timer[2])); //min
  if(timer[1] <= 23 || timer[1] >= 0 ) clock.sethr(int(timer[1])); //hr
  clock.setyr(int(timer[0])); //yr
}

function draw() {
  background(0,100,0);
  translate(windowWidth/4,0)
    
  //Zeit hochzählen
  if(millis() > ms+1000){ //ms zählt zu schnell hoch weshalb modulo nicht ging
      clock.setsc(clock.sc+1);
      ms = millis();
  }
  if(clock.sc > 59){
      clock.setsc(0);
      clock.setmn(clock.mn+1);
  }
  if(clock.mn > 59){
      clock.setmn(0);
      clock.sethr(clock.hr+1);
  }
  if(clock.hr > 23){
      clock.sethr(0);
  }
  if(ms > 31536000000){
      clock.setyr(clock.yr+1);
      ms = 0;
  }
    
  //fallender Tropfen
  dropY++;
  noStroke();
  fill(50,200,250);
  triangle(dropX-10, dropY, dropX+10, dropY, dropX, dropY-40);
  ellipse(dropX,dropY,20,20);
  dropY = dropY + 7.9;
  if (dropY > 260){
    dropY = 0;
  }
  
  //Eimer Sekunden
  fill(100);
  push();
  translate(160,320);
  rotate(25/60 * clock.sc);
  beginShape();
  vertex(-80, 0);
  vertex(0, 0);
  vertex(10, -100);
  vertex(-95, -100);
  endShape();
  text(clock.sc + ' s', -55, 30);
  pop();
    
  //Eimer Minuten
  fill(120);
  push();
  translate(310, 380);
  rotate(17/60 * clock.mn);
  beginShape();
  vertex(-80, 0);
  vertex(0, 0);
  vertex(10, -100);
  vertex(-95, -100);
  endShape();
  text(clock.mn + ' min', -55, 30);
  pop();
    
  //Eimer Stunden
  fill(140);
  push();
  translate(460, 480);
  rotate(18/24 * clock.hr);
  beginShape();
  vertex(-80, 0);
  vertex(0, 0);
  vertex(10, -100);
  vertex(-95, -100);
  endShape();
  text(clock.hr + ' h', -55, 30);
  pop();

  //Pfütze
  fill(50,200,250);
  ellipse(570,610,250,150);
    
  //Eimer Jahr
  fill(160);
  push();
  translate(610, 560);
  beginShape();
  vertex(-80, 0);
  vertex(0, 0);
  vertex(10, -100);
  vertex(-95, -100);
  endShape();
  text(clock.yr + ' J', -55, 30);
  pop();
}

class Clock {
  constructor(){
    this.hr = int(hour());
    this.mn = int(minute());
    this.sc = int(second());
    this.yr = int(year());
  } 
    
  sethr(x){this.hr = x}
  setmn(x){this.mn = x}
  setsc(x){this.sc = x}
  setyr(x){this.yr = x}
    
}