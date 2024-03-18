import { Sprite } from "./render-sprite";
import { CanvasContext } from "../utils/types";

export default class StaticProp {

    private sprite: Sprite;
    private coords: {x:number, y:number} = {x:0, y:0};
    private context: CanvasContext | null = null;
    angle: number = 0;

    constructor(x:number, y:number, width:number, height:number, image:string) {
        const sprite = new Sprite(x, y, width, height, image);
        this.coords = {x, y};
        this.sprite = sprite;
    }

    getCoords = () => { return this.coords; }

    setContext = (context:CanvasContext) => {
        this.context = context;
    }

    render = () => {
        if (this.context) {
            this.sprite.draw(this.context);
        }
    }

    rotate = (angle:number) => {
        this.angle = angle;
        this.sprite.rotate(this.angle);
    }
}