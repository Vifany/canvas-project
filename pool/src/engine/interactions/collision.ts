import Ball from "../render/actors/ball";
import Bat from "../render/actors/bat";

const calculateBatCollision = (ball: Ball, bat: Bat, distance:number, dx:number, dy:number) => {
    const relativeVelocityX = -ball.getXVelocity();
    const relativeVelocityY = -ball.getYVelocity();
    const normalVectorX = dx / distance;
    const normalVectorY = dy / distance;
    const impulse = (2 * (relativeVelocityX * normalVectorX + relativeVelocityY * normalVectorY)) / 2;
    ball.setVelocity(
        ball.getXVelocity() + 2 * impulse * normalVectorX,
        ball.getYVelocity() + 2 * impulse * normalVectorY
    );
    ball.setSpeed(ball.getSpeed()*1.1);

};


const calculateCollision = (
    ball: Ball, 
    otherBall: Ball,
    distance:number, 
    dx:number, 
    dy:number
    ) => {
 {
        const relativeVelocityX = otherBall.getXVelocity() - ball.getXVelocity();
        const relativeVelocityY = otherBall.getYVelocity() - ball.getYVelocity();
        const normalVectorX = dx / distance;
        const normalVectorY = dy / distance;
        const impulse = (2 * (relativeVelocityX * normalVectorX + relativeVelocityY * normalVectorY)) / 2;
        ball.setVelocity(
            ball.getXVelocity() + impulse * normalVectorX,
            ball.getYVelocity() + impulse * normalVectorY
        );
        otherBall.setVelocity(
            otherBall.getXVelocity() - impulse * normalVectorX,
            otherBall.getYVelocity() - impulse * normalVectorY
        );
        ball.setSpeed(ball.getSpeed()*0.95);
        otherBall.setSpeed(otherBall.getSpeed()*0.95);
    }
};

export const detectCollision = (balls: Ball[]) => {
    balls.forEach((ball, index) => {
        balls.forEach((otherBall, otherIndex) => {
            if (
                otherIndex <= index 
                || !otherBall.isCollidable() 
                || !ball.isCollidable()
            )
                return;
            const ballCoords:{x:number, y:number} = ball.getCoords();
            const otherCoords:{x:number, y:number} = otherBall.getCoords();
            const dx = ballCoords.x - otherCoords.x;
            const dy = ballCoords.y - otherCoords.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance <= ((ball.getWidth() + otherBall.getWidth()) / 2)){
                if ((distance)<((ball.getWidth() + otherBall.getWidth()) / 2)){
                    ball.setSpeed(ball.getSpeed()*1.1);
                    otherBall.setSpeed(otherBall.getSpeed()*1.1);
                }
                calculateCollision(ball, otherBall, distance, dx, dy);
            }
        });
    });
};


export const detectBatCollision = (balls: Ball[], bat: Bat) => {

    balls.forEach((ball) => {
        if (!bat.isExists) return;
        
        const ballCoords:{x:number, y:number} = ball.getCoords();
        const batCoords:{x:number, y:number} = bat.getCoords();
        const dx = ballCoords.x - batCoords.x;
        const dy = ballCoords.y - batCoords.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const nextCoords:{x:number, y:number} = {
            x: ballCoords.x + ball.getXVelocity(),
            y: ballCoords.y + ball.getYVelocity()
        }
        const ndX = nextCoords.x - batCoords.x;
        const ndY = nextCoords.y - batCoords.y;
        const nextDistance = Math.sqrt(ndX * ndX + ndY * ndY);

        if (!(distance < (ball.getWidth() + bat.getRadius()) / 2)) return;
        if (nextDistance < distance) {
            calculateBatCollision(ball, bat, distance, dx, dy);
        }else if (nextDistance >= distance) {
            ball.setSpeed(ball.getSpeed()*2);
        }
        if (ball.getSpeed() <= 1) {
            const batCenterX = batCoords.x + bat.getRadius() / 2;
            const batCenterY = batCoords.y + bat.getRadius() / 2;
            const directionX = ballCoords.x - batCenterX;
            const directionY = ballCoords.y - batCenterY;
            const normalizedDirectionX = directionX / distance;
            const normalizedDirectionY = directionY / distance;
            ball.setVelocity(
                0.5*normalizedDirectionX,
                0.5*normalizedDirectionY
            );
        }

    });
}