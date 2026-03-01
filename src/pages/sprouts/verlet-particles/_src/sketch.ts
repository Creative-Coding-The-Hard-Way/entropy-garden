import { vec2, type Vec2 } from "@lib/math/vec2";
import p5 from "p5";

/**
 * A particle that uses Verlet integration for position updates.
 **/
class VerletParticle {
  pos: Vec2;
  last_pos: Vec2;
  acceleration: Vec2;
  radius: number;

  constructor(pos: Vec2, radius: number, vel?: Vec2) {
    this.pos = pos;
    this.last_pos = pos.sub(vel || vec2(0, 0));
    this.acceleration = vec2(0, 0);
    this.radius = radius;
  }

  get x(): number {
    return this.pos.x;
  }

  get y(): number {
    return this.pos.y;
  }

  /**
   * Apply an acceleration to the particle.
   * Accelerations accumulate until the next call to `integrate`.
   */
  accelerate(acceleration: Vec2) {
    this.acceleration = this.acceleration.sum(acceleration);
  }

  /**
   * Resolve a collision between this particle and another.
   * Is a no-op if the particles are not actually colliding.
   */
  resolve_collision(other: VerletParticle) {
    const axis = other.pos.sub(this.pos);
    const len = axis.mag();
    const intersect = other.radius + this.radius - len;
    if (intersect < 0) {
      // no intersection, nothing to do
      return;
    }
    other.pos = other.pos.sum(axis.scale((0.5 * intersect) / len));
    this.pos = this.pos.sum(axis.scale((-0.5 * intersect) / len));
  }

  /**
   * Calculate the updated position with Verlet integration.
   */
  integrate(dt: number) {
    const last_pos = this.pos;
    const vel = this.pos.sub(this.last_pos);
    this.pos = this.pos.sum(vel).sum(this.acceleration.scale(dt * dt));
    this.last_pos = last_pos;
    this.acceleration.set(0, 0);
  }
}

function constrain_inside(
  point: Vec2,
  center: Vec2,
  range: number,
  radius: number,
): Vec2 {
  const delta = point.sub(center); // from center to point
  const dist = delta.mag();
  if (dist > range - radius) {
    return center.sum(delta.scale((range - radius) / dist));
  }
  return point;
}

export const sketch = (p: p5) => {
  const gravity = vec2(0, 1000.0);
  const particles: VerletParticle[] = [];

  function update(dt: number) {
    particles.forEach((particle) => particle.accelerate(gravity));
    apply_constraint();
    particles.forEach((particle) => particle.integrate(dt));
  }

  function apply_constraint() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        particles[i].resolve_collision(particles[j]);
      }
    }

    const center = vec2(p.width / 2, p.height / 2);
    particles.forEach((particle) => {
      particle.pos = constrain_inside(
        particle.pos,
        center,
        200,
        particle.radius,
      );
    });
  }

  function draw() {
    particles.forEach((particle) => {
      p.circle(particle.x, particle.y, particle.radius * 2);
    });
  }

  p.setup = () => {
    p.createCanvas(800, 600);
  };

  p.draw = () => {
    p.background(128);

    p.fill(0);
    p.circle(p.width / 2, p.height / 2, 400);
    p.fill(255);

    const SUBSTEPS = 4;
    const dt = 1 / 60 / SUBSTEPS;
    for (let i = 0; i < SUBSTEPS; i++) {
      update(dt);
    }
    draw();
  };

  p.mouseReleased = () => {
    particles.push(
      new VerletParticle(vec2(p.mouseX, p.mouseY), Math.random() * 25),
    );
  };
};
