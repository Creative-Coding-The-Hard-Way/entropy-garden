export class Vec2 {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  /**
   * Sets this vector's x and y coordinates to the provided value.
   */
  set(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  /**
   * Clones the vector.
   **/
  clone(): Vec2 {
    return vec2(this.x, this.y);
  }

  /**
   * Scales the vector in-place.
   **/
  scale(t: number): Vec2 {
    return vec2(t * this.x, t * this.y);
  }

  /**
   * Compute the dot product of this vector with another vector.
   **/
  dot(vec: Vec2): number {
    return this.x * vec.x + this.y * vec.y;
  }

  /**
   * Computes the vector result of `this - vec`.
   **/
  sub(vec: Vec2): Vec2 {
    return vec2(this.x - vec.x, this.y - vec.y);
  }

  /**
   * Computes the vector `this + vec`.
   */
  sum(vec: Vec2): Vec2 {
    return vec2(this.x + vec.x, this.y + vec.y);
  }

  /**
   * Returns the perpendicular version of this vector, rotated 90 degrees.
   **/
  perp(): Vec2 {
    return vec2(-this.y, this.x);
  }

  /**
   * Computes the "Perpendicular Dot Product" between this vector and another.
   * A slightly faster version of `this.dot(vec.perp())`. Order matters.
   **/
  perp_dot(vec: Vec2): number {
    return this.x * -vec.y + this.y * vec.x;
  }

  /**
   * Returns the squared magnitude of the vector.
   **/
  mag_squared(): number {
    return this.x * this.x + this.y * this.y;
  }

  /**
   * Returns the magnitude of the vector.
   **/
  mag(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
}

/**
 * Shorthand for creating a new vector.
 **/
export function vec2(x: number, y: number): Vec2 {
  return new Vec2(x, y);
}
