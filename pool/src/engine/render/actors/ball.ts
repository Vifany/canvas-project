import Actor from "../actor";
import {Sprite} from "../render-sprite";
import Boule from '../../../assets/lesBoules/green-boule.png';

export default class Ball extends Actor {
    protected width: number = 50;
    protected height: number = 50;
    protected speed: number = 1;
    protected direction: number = 20;
    protected collidable: boolean = true;
    protected speedLoss: number = 0.001;

    constructor(x: number, y: number) {
        const sprite = new Sprite(x, x, 50, 50, Boule);
        super(sprite);
        this.coords = { x, y };
    }

    getCoords = () => { return this.coords; }

    setSpeed = (speed: number) => { this.speed = speed; }
    setDirection = (direction: number) => { 
        if (Math.abs(direction) > 360) {
            this.direction = direction - 360;
            return;
        }

        this.direction = direction;
    }
    getSpeed = () => { return this.speed; }
    getDirection = () => { return this.direction; }
    getWidth = () => { return this.width; }
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

    private bounce = () => {
        if (!this.context) return
        this.speed = this.speed*(1-this.speedLoss)- 0.0005;
        
        if (this.speed < 0) this.speed = 0;
        if (this.speed > 3) this.speed = 3;
        const angle = this.direction * Math.PI / 180;
        const xSpeed = this.speed * Math.cos(angle);
        const ySpeed = this.speed * Math.sin(angle);

        this.coords.x += xSpeed;
        this.coords.y += ySpeed;

        if (this.coords.x + this.width >= this.context.canvas.width 
            || this.coords.x <= 0) {
                this.direction = 180 - this.direction;
        }
        if (this.coords.y + this.height >= this.context.canvas.height 
            || this.coords.y <= 0) {
                this.direction = -this.direction;
        }

        if(
            this.coords.x - (this.width)/2>this.context.canvas.width
            || this.coords.x+(this.width)/2<0
            || this.coords.y - (this.height)/2>this.context.canvas.height
            || this.coords.y+(this.height)/2<0
            
            ){
            this.speed = 1
            this.coords.x = 100;
            this.coords.y = 100; 
        }
    }

    public render = () => {
        
        this.draw();
        this.bounce();
    }


}