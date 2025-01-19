function Firework(font) {
  this.hu = random(255);
  this.firework = new Particle(mouseX, height, this.hu, true, 0, 0);
  this.exploded = false;
  this.particles = [];
  this.points = font.textToPoints('2022', windowWidth/2-80, windowHeight/2, 90);

  this.done = function() {
    if (this.exploded && this.particles.length === 0) {
      return true;
    } else {
      return false;
    }
  };

  this.update = function() {
    if (!this.exploded) {
      this.firework.applyForce(gravity);
      this.firework.update();

      if (this.firework.vel.y >= 0) {
        this.exploded = true;
        this.explode();
      }
    }

    for (var i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].applyForce(gravity);
      this.particles[i].update();

      if (this.particles[i].done()) {
        this.particles.splice(i, 1);
      }
    }
  };

  this.explode = function() {
    for (var i = 0; i < this.points.length; i++) {
      var p = new Particle(
        this.firework.pos.x,
        this.firework.pos.y,
        this.hu,
        false,
        this.points[i].x,
        this.points[i].y
      );
      this.particles.push(p);
    }
  };

  this.show = function() {
    if (!this.exploded) {
      this.firework.show();
    }

    for (var i = 0; i < this.particles.length; i++) {
      this.particles[i].show();
    }
  };
}