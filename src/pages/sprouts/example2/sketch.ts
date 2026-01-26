import p5 from "p5";

export const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(800, 400);
  };

  p.draw = () => {
    p.background("blue");
    p.circle(p.mouseX, p.mouseY, 50);
  };
};
