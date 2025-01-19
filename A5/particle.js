function Particle(x, y, hu, firework, xp, yp) {
  this.pos = createVector(x, y);
  this.target = createVector(xp, yp);
  this.firework = firework;
  this.lifespan = 255;
  this.hu = hu;
  this.acc = createVector(0, 0);
  this.angle = random(TWO_PI);
  this.xp = xp;
  this.yp = yp;

  if (this.firework) {
    this.vel = createVector(cos(this.angle), random(-17, -9));
  } else {
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(4, 10)); 
  }

  this.applyForce = function(force) {
    this.acc.add(force);
  };

  this.update = function() {
    if (!this.firework) {
      this.vel.mult(0.9);
      this.lifespan -= 2;
    }

    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  };

  this.done = function() {
    if (this.lifespan < 0) {
      return true;
    } else {
      return false;
    }
  };

  this.show = function() {
    colorMode(HSB);

    if (!this.firework) {
      strokeWeight(4);
      stroke(hu, int(random(255)), int(random(255)), this.lifespan);
      point(this.xp, this.yp); //2022
    } else {
      strokeWeight(12);
      stroke(hu, 255, 255);
    }

    point(this.pos.x, this.pos.y);
  };
}