import { vec2, type Vec2 } from "@lib/math/vec2";
import p5 from "p5";

class Segment {
  /**
   * The starting endpoint for the segment.
   **/
  public s: Vec2;

  /**
   * The ending endpoint for the segment.
   **/
  public e: Vec2;

  constructor(start: Vec2, end: Vec2) {
    this.s = start;
    this.e = end;
  }

  intersect(other: Segment): Vec2 | null {
    const p = this.s;
    const r = this.e.sub(this.s);
    const q = other.s;
    const s = other.e.sub(other.s);

    const denominator = r.perp_dot(s);
    if (denominator == 0) {
      return null;
    }

    const t = (q.perp_dot(s) - p.perp_dot(s)) / denominator;
    if (t < 0 || t > 1) {
      return null;
    }

    const u = (q.perp_dot(r) - p.perp_dot(r)) / denominator;
    if (u < 0 || u > 1) {
      return null;
    }

    return p.sum(r.scale(t));
  }
}

export const sketch = (p: p5) => {
  p.disableFriendlyErrors = true;

  function mouse(): Vec2 {
    return vec2(p.mouseX - p.width / 2, p.height / 2 - p.mouseY);
  }

  p.setup = () => {
    p.createCanvas(800, 400);
  };

  p.draw = () => {
    p.background(128);
    p.translate(p.width / 2, p.height / 2);
    p.scale(1, -1);

    let m = mouse();

    let l1 = new Segment(vec2(-100, 100), vec2(100, -100));
    let l2 = new Segment(vec2(100, 100), m);

    p.line(l1.s.x, l1.s.y, l1.e.x, l1.e.y);
    p.line(l2.s.x, l2.s.y, l2.e.x, l2.e.y);

    let point = l1.intersect(l2);
    if (point != null) {
      p.circle(point.x, point.y, 5);
    }
  };
};
