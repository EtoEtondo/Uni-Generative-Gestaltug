// Daniel Shiffman
// https://thecodingtrain.com
// https://thecodingtrain.com/CodingChallenges/124-flocking-boids.html
// https://github.com/CodingTrain/website/blob/main/learning/nature-of-code/5.2-seek/seek/vehicle.js
// https://editor.p5js.org/ray.toal/sketches/MX7qvtpCO
// Sound
// https://www.salamisound.de/2809463-sfx-space-metallisch-glas
// https://www.soundfishing.eu/sound/laser-gun

// Wir befinden uns in der Zukunft im Weltall. Unser Raumschiff kommt in einen Asteoriedengürtel und wir versuchen zu entkommen. Doch dann tauchen Aliens auf.
// Diese werden bekämpft und haben Respekt vor unseren Waffen, weshalb sie versuchen zu fliehen!

const flock = [];
let alignSlider, cohesionSlider, separationSlider, targetSlider;
let mode = 0; //von Kometen fliehen=0 oder andere Raumschiffe jagen!=0
var sound;
var sound2;

function preload() {
  sound = loadSound('sound.mp3');
  sound2 = loadSound('sound2.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  sound.loop();
  sound2.loop();
  alignSlider = createSlider(0, 2, 1, 0.1);
  cohesionSlider = createSlider(0, 2, 1, 0.1);
  separationSlider = createSlider(0, 2, 1, 0.1);
  targetSlider = createSlider(-11, -2, -5, 1); //iwie kein krassen Effekt
  for (let i = 0; i < 130; i++) {
    flock.push(new Boid());
  }
}

function mousePressed() {
  if (sound2.isPlaying()) {
    sound2.stop();
    sound.play();
    mode = 0;
  } else {
    sound.stop();
    sound2.play();
    mode = 1;
  }
}

function draw() {
  background(0,0,0);
 
  if(mode == 0){ //vor Asteoriden fliehen, während diese verfolgen
     for (let boid of flock) {
        if(boid == flock[0]){
            target = flock[0];
            boid.edges();
            for(let boids of flock) { //um vor jedem Partikel zu fliehen
                boid.flock(flock);
                boid.applyForce(boid.flee(target.position));  
            }
            boid.update();
            boid.show2();
        }else{
            boid.edges();
            boid.flock(flock);
            boid.update();
            boid.show();   
        }
    }
  }else { //Aliens verfolgen, während diese fliehen
      for (let boid of flock) {
            if(boid == flock[0]){
                boid.edges();    
                boid.flock(flock);  
                boid.update();
                boid.show2();
            }else{
                boid.edges();
                boid.flock(flock);
                boid.applyForce(boid.flee(boid.position));  
                boid.update();
                boid.show3();   
            }
      }   
  }
}