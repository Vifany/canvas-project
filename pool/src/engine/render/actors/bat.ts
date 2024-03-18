import Actor from "../actor";
import {Sprite} from "../render-sprite";
import Bat from '../../../assets/leBat.png';


export default class Ball extends Actor {
    protected radius: number = 30;
    protected exists: boolean = true;
    protected collidable: boolean = true;
    protected location: { x: number, y: number } = { x: 0, y: 0 };

    constructor(radius:number) {

        const sprite = new Sprite(0, 0, radius*2, radius*2, Bat);
        super(sprite);
        this.radius = radius;
        this.coords = { x:0, y:0 };
    }

    getCoords = () => { return this.location; }
    setCoords = (x: number, y: number) => { 
        this.location = { x, y }; 
        this.coords = { x: x-this.radius, y: y-this.radius };
    }
    getRadius = () => { return this.radius; }

    setExistance = (exists: boolean) => {
        if (!exists) {
            this.clear();
        }
        this.exists = exists; 
    }
    isExists = () => { return this.exists; }

    render = () => {
        if (this.context && this.exists) {
            this.draw();
        }
    }

}