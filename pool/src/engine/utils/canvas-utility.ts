import { CanvasContext } from "./types";
import Ball from "../render/actors/ball";


export const checkPosition = (balls: Ball[], xT: number, yT: number): boolean => {
  for (const ball of balls) {
    const radius = ball.getRadius();
    const{x, y} = ball.getCoords();
    const distance = Math.sqrt((xT - x) ** 2 + (yT - y) ** 2);
    if (distance <= radius) {
      return true;
    }
  }
  return false;
};




export const clearCanvas = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

export  const drawRect = (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) => {
    ctx.fillRect(x, y, width, height);
  };

export  const bouncingRect = ( 
  startX: number, 
  startY:number, 
  width: number,
  height: number
  ) => {

    let x = startX;
    let y = startY;
    let xSpeed = 1;
    let ySpeed = 1;
  

  
    const draw = (context: CanvasContext) => {
      drawRect(context.ctx, x, y, width, height);
      x += xSpeed;
      y += ySpeed;
  
      if (x + width > context.canvas.width || x < 0) {
        xSpeed = -xSpeed;
      }
      if (y + height > context.canvas.height || y < 0) {
        ySpeed = -ySpeed;
      }
    };
  
    return draw;
  };

