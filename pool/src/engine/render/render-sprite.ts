import { CanvasContext } from "../utils/types";

export class Sprite {
  protected image: HTMLImageElement;
  protected x: number;
  protected y: number;
  private width: number;
  private height: number;
  protected prevX: number = 0;
  protected prevY: number = 0;
  protected isLoaded: boolean = false;

  constructor(
    x: number,
    y: number, 
    width: number, 
    height: number, 
    imageSource: string,

  ) {
    this.image = new Image(width,height);
    this.image.src = imageSource;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image.onload = () => {
      this.isLoaded = true;
    }
  }

  selfDestruct = (context: CanvasContext) => {
    context.ctx.clearRect(
      this.prevX - 1, 
      this.prevY - 1, 
      this.width + 1, 
      this.height+ 1
    );
  }

  draw = (context: CanvasContext) => {
    if (this.isLoaded)
      context.ctx.drawImage(
        this.image, 
        this.x, 
        this.y, 
        this.width, 
        this.height);
  }

  setCoords = (nX: number, nY: number) => {
    this.prevX = this.x;
    this.prevY = this.y;
    this.x = nX;
    this.y = nY;
  }

  rotate = (angle: number) => {
    this.image.style.transform = `rotate(${angle}deg)`;
  }
}