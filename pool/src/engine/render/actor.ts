import {Sprite} from './render-sprite';
import { CanvasContext } from '../utils/types';


export default class Actor {
    protected sprite: Sprite;
    protected context?: CanvasContext;
    protected coords: { x: number, y: number } = { x: 0, y: 0 };

    constructor(sprite: Sprite) {
        this.sprite = sprite;
        this.coords = { x: 0, y: 0 };
    }

    setContext = (context: CanvasContext) => {
        this.context = context;
    }

    getCoords = () => { return this.coords; }

    draw = () => {
        if (this.context) {
            this.moveTo(this.coords.x, this.coords.y);
            this.sprite.draw(this.context);
        }
    }

    clear = () => {
        if (this.context) {
            this.sprite.selfDestruct(this.context);
        }
    }

    private moveTo (nX: number, nY: number) {
        this.sprite.setCoords(nX, nY);
    }



}