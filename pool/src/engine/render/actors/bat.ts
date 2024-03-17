import Actor from "../actor";
import {Sprite} from "../render-sprite";
import Bat from '../../../assets/leBat.png';


export default class Ball extends Actor {
    protected radius: number = 30;
    protected exists: boolean = true;
    protected collidable: boolean = true;

    constructor(radius:number) {

        const sprite = new Sprite(0, 0, radius, radius, Bat);
        super(sprite);
        this.radius = radius;
        this.coords = { x:0, y:0 };
    }

    getCoords = () => { return this.coords; }
    setCoords = (x: number, y: number) => { this.coords = { x, y }; }
    getRadius = () => { return this.radius; }

    setExistance = (exists: boolean) => { this.exists = exists; }
    isExists = () => { return this.exists; }

    render = () => {
        if (this.context && this.exists) {
            this.draw();
        }
    }

}