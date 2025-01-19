function Vehicle(x, y, x2, y2) {
  this.pos = createVector(20, 20);
  this.target = createVector(x, y); //love
  this.target2 = createVector(x2, y2); //<3
  this.vel = p5.Vector.random2D();
  this.acc = createVector();
  this.r = 6;
  this.maxspeed = 10;
  this.maxforce = 1;
}

Vehicle.prototype.force = function(random){
  var mouse = createVector(mouseX*0.001*random, 0); //Wind
  var gravity = createVector(0, mouseY*0.001); //Schwerkraft

  this.applyForce(mouse);
  this.applyForce(gravity);
}

Vehicle.prototype.behaviors = function() {
  var arrive = this.arrive(this.target);
  var heart = this.arrive(this.target2);
    
  if(mouseIsPressed) {
    heart.mult(2);
    this.applyForce(heart);
  }
  else {
    arrive.mult(1);
    this.applyForce(arrive);
  }
};

Vehicle.prototype.applyForce = function(f) {
  this.acc.add(f);
};

Vehicle.prototype.update = function() {
  this.pos.add(this.vel);
  this.vel.add(this.acc);
  this.acc.mult(0);
};

Vehicle.prototype.show = function(r,g,b,a) {
  stroke(r,g,b,a);
  if(mouseIsPressed){
    stroke(round(random(255)),0,0);
    if(this.r >= 10){
        this.r = 6
    }else{
        this.r = map(this.r, 10, this.r, 0, this.r+0.3); //Herzschlag   
    }
  }else{
    this.r = 6;
  }
  strokeWeight(this.r);
  point(this.pos.x, this.pos.y);
};

Vehicle.prototype.arrive = function(target) {
  var desired = p5.Vector.sub(target, this.pos);
  var d = desired.mag();
  var speed = this.maxspeed;
  if (d < 100) {
    speed = map(d, 0, 100, 0, this.maxspeed);
  }
  desired.setMag(speed);
  var steer = p5.Vector.sub(desired, this.vel);
  steer.limit(this.maxforce);
  return steer;
};