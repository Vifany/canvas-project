import { CanvasContext } from "../utils/types";

export class Sprite {
  private image: HTMLImageElement;
  protected x: number;
  protected y: number;
  private width: number;
  private height: number;

  constructor(
    x: number,
    y: number, 
    width: number, 
    height: number, 
    imageSource: string,

  ) {
    this.image = new Image();
    this.image.src = imageSource;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw = (context: CanvasContext) => {
    context.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  setCoords = (nX: number, nY: number) => {
    this.x = nX;
    this.y = nY;
  }
}