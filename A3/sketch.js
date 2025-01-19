// Daniel Shiffman
// https://www.youtube.com/watch?v=4hA7G3gup-4
// https://editor.p5js.org/codingtrain/sketches/kYWcOmch
// https://youtu.be/Uibl0UE4VH8
// https://p5js.org/examples/image-background-image.html
// https://p5js.org/examples/sound-load-and-play-sound.html
// Abstraktes Bild
// https://de.vecteezy.com/vektorkunst/1962120-paar-minimalismus-einzeiliger-mann-und-frau-kuss
// Sounds
// https://www.salamisound.de/8309447-herzschlag-puls-normal

// Liebe entsteht - Liebe verweht
// Wort liebe funkelt in alles Farben weil das leben dadurch bunter wird
// Maus gedrückt lassen -> festes, rotes Herz entsteht
// Maus bewegen -> Partikel wehen davon und werden grau weil ohne Liebe ist Leben sad

var font;
var vehicles = [];
var trigger = false;
var herz;
var bg;

function preload() {
  font = loadFont('AvenirNextLTPro-Demi.otf');
  bg = loadImage('love.jpg');
  herz = loadSound('herz.mp3');
}

function setup() {
  herz.loop();
  createCanvas(windowWidth, windowHeight);
  background(bg);

  var points = font.textToPoints('love', 30, 200, 192, {
    sampleFactor: 0.102
  });
  //console.log(points.length);
    
  var points2 = font.textToPoints('<3', windowWidth-300, 200, 192, {
    sampleFactor: 0.177
  });
  //console.log(points2.length); //beide 187 groß
    
  for (var i = 0; i < points.length; i++) {
    var pt = points[i];
    var pt2 = points2[i];
    var vehicle = new Vehicle(pt.x, pt.y, pt2.x, pt2.y);
    vehicles.push(vehicle);
  }
}

function mouseMoved(){
  trigger = true;  
};

function mousePressed(){
    herz.play();
}

function mouseReleased(){
    herz.stop();
}

function draw() {
  background(bg);
  if (trigger == true) {
    for (var i = 0; i < vehicles.length; i++) {
        var v = vehicles[i];
        v.force(random(0,1)); //Wind und Schwerkraft bei Mausbewegung
        v.update();
        v.show(105,105,105);
    }
        trigger = false;
  }else {
      for (var i = 0; i < vehicles.length; i++) {
        var v = vehicles[i];
        v.behaviors();
        v.update();
    v.show(round(random(255)),round(random(255)),round(random(255)),round(random(255)));
      }
      trigger = false;
  }
}