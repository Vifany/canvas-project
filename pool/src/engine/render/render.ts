import Ball from "./actors/ball";
import Bat from "./actors/bat";

export const clearCanvas = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

export const renderCanvas = (renderStack: Ball[], bat: Bat) => {

  renderStack.forEach((render) => render.render());
  bat.render();
};