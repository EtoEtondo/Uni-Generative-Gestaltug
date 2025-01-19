// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/CKeyIbT3vXI
// Häuser und Winkel Inspiration
// https://happycoding.io/examples/p5js/creating-classes/fireworks
// Sound - spielt beim pressen der Maustaste
// https://www.salamisound.de/3038400-grosses-feuerwerk-zu-sylvester
// Feuerwerk nach Maus-X Position, erscheinen der Schrift 2022

var fireworks = [];
var gravity;
var sound;
var font;

function preload() {
  sound = loadSound('sound.mp3');
  font = loadFont('AvenirNextLTPro-Demi.otf');
}

function makeHouses() {
	houses = createGraphics(width, height);
	houses.strokeWeight(2);
	const houseCount = 15;
	const houseWidth = width / houseCount;
	const houseWindowWidth = 10;
	const houseWindowHeight = 15;
	for (let i = 0; i < houseCount; i++) {
		const houseHeight = random(80, 260);
		houses.fill(170);
		houses.rect(houseWidth * i, height - houseHeight, houseWidth, houseHeight * 2);
		for (let windowY = height - houseHeight + 10; windowY < height - houseWindowHeight - 5; windowY += houseWindowHeight + 5) {
			houses.fill(random() < 0.25 ? 'yellow' : 64);
			houses.rect(houseWidth * i + 12, windowY, houseWindowWidth, houseWindowHeight);
			houses.fill(random() < 0.25 ? 'yellow' : 64);
			houses.rect(houseWidth * (i + 1) - 12 - houseWindowWidth, windowY, houseWindowWidth, houseWindowHeight);
		}
	}
}

function mousePressed() {
  if (sound.isPlaying()) {
    sound.stop();
  } else {
    sound.play();
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  gravity = createVector(0, 0.2);
  stroke(255);
  strokeWeight(4);
  background(0);
  makeHouses();
}

function draw() {
  colorMode(RGB);
  background(0, 0, 0, 200);

  if (random(1) < 0.05) {
    fireworks.push(new Firework(font));
  }

  for (var i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].show();

    if (fireworks[i].done()) {
      fireworks.splice(i, 1);
    }
  }

  image(houses, 0, 0);
}