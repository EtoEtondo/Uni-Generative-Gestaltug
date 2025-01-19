// Daniel Shiffman
// Coding Challenge #24: Perlin Noise Flow  Field
// https://youtu.be/BjoM9oKOAKY
// https://p5js.org/examples/sound-preload-soundfile.html
// https://www.youtube.com/watch?v=1qBCmss1E5E&t=205s
// https://www.youtube.com/watch?v=jq4EUSCMPXg
// Copyright Free Music JBlanked - Tenderly
// https://freemusicarchive.org/music/J_Blanked_On_This_Beat/Chill_Vibes/Tenderly_1085

// Leaf Tornado / Leaf Storm

//let song;
let width = window.innerWidth;
let height = window.innerHeight;
let zoff = 0;
let dance = 0;
const n = 50;
particles = [];
flowField = [];

//function preload () {
    //song = loadSound('music.mp3'); //Musik wird iwie nicht gespielt, deswegen aus HTML
//}

function setup() {
    //song.loop();
    //song.play();
    //song.setVolume(0.8);
    createCanvas(width, height);
    
    const delta = TWO_PI / n;
    const radius = 50;

    flowField = new Array(n);
    for(let k = 0; k < n; k++){
        flowField[k]=createVector(0,0);
    }

    for (let i = 0; i < n; i++) {
        const angle = i * delta;
        const x = radius * sin(angle) + width/2;
        const y = radius * cos(angle) + height/2;  
        if (i != 0){
          flowField[i].x = x-x_tmp;
          flowField[i].y = y-y_tmp;
        }
        x_tmp = x;
        y_tmp = y;
    }
    
    flowField[0].x = (radius * sin(0) + width/2) - (radius * sin((n-1)*delta) + width/2);
    flowField[0].y = (radius * cos(0) + height/2) - (radius * cos((n-1)*delta) + height/2);
    
    for(i=0; i<300; i++){
        particles[i] = createVector(random(width), random(height));
    }
}

function draw() {
    background(120);
    
    strokeWeight(20);
    stroke(255,100,0);
    for(i=0; i<50; i++){
        x_val = flowField[dance].x;
        y_val = flowField[dance].y;
        if(i%5==0){x_val=x_val*2; y_val=y_val*2}
        if(i%5==1){x_val=x_val*0.6; y_val=y_val*0.6}
        point(particles[i].x+x_val, particles[i].y+y_val);
        particles[i].add(createVector(x_val, y_val));
    }
    
    zoff += 1;
    if (zoff == 1){
        zoff = 0; 
        dance++;
        if (dance == n) dance = 0;
    }
    
    strokeWeight(100);
    stroke(80,100,0);
    pt = point(width/2, height/2); //Baum in der mitte und Blätter kreisen rum
}