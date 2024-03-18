import Actor from "../actor";
import {Sprite} from "../render-sprite";
import BouleRed from '../../../assets/lesBoules/red-boule.png';

export default class Ball extends Actor {
    protected diameter: number = 50;
    protected speed: number = 1;
    protected direction: number = 20;
    protected collidable: boolean = true;
    protected speedLoss: number = 0.001;
    protected location: { x: number, y: number } = { x: 0, y: 0 };

    constructor(x: number, y: number, diameter: number) {
        const sprite = new Sprite(x, y, diameter, diameter, BouleRed);
        super(sprite);
        this.diameter = diameter;
        this.location = { x:(x+diameter/2), y:(y+diameter/2) };
    }

    getCoords = () => { return this.location; }

    setSpeed = (speed: number) => { this.speed = speed; }

    getDirection = () => { return this.direction; }
    setDirection = (direction: number) => { 
        if (Math.abs(direction) > 360) {
            this.direction = direction - 360;
            return;
        }

        this.direction = direction;
    }

    getRadius = () => { return this.diameter
    / 2; }

    getSpeed = () => { return this.speed; }

    getXVelocity = () => { 
        return this.speed * Math.cos(this.direction * Math.PI / 180); 
    }

    getYVelocity = () => { 
        return this.speed * Math.sin(this.direction * Math.PI / 180); 
    }

    setVelocity = (x: number, y: number) => {
        this.speed = Math.sqrt(x * x + y * y);
        this.direction = Math.atan2(y, x) * 180 / Math.PI;
    }

    isCollidable = () => { return this.collidable; }

    setCollidable = (collidable: boolean) => { this.collidable = collidable; }

    getSpriteCoords = () => { 
        return ({
            x: this.coords.x - this.getRadius(),
            y: this.coords.y - this.getRadius()
        }) }


    private transpose = (dX: number, dY: number) => {
        this.location.x = this.location.x + dX;
        this.location.y = this.location.y + dY;
    }

    swapSprite = (image: string) => {
        this.sprite = new Sprite(
            this.coords.x, 
            this.coords.y, 
            this.diameter, 
            this.diameter, 
            image
        );
    }

    step = () => {
        this.transpose(
            this.getXVelocity(), 
            this.getYVelocity()
        );
    }

    teleport = (x: number, y: number) => {
        this.location = { x, y };
    }

    private bounce = () => {
        if (!this.context) return
        if (this.speed == 0) {
            return;
        }
        this.step();
    }

    push = (amount: number) => {
        this.transpose(
            amount * Math.cos(this.direction * Math.PI / 180), 
            amount * Math.sin(this.direction * Math.PI / 180)
        );
    }

    render = () => {
        this.coords = { 
            x: this.location.x - this.diameter/2, 
            y: this.location.y - this.diameter/2 
        };
        this.draw();
        this.bounce();
    }


}