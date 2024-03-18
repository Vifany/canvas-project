import Ball from "../render/actors/ball";
import Bat from "../render/actors/bat";

const calculateBatCollision = (
    ball: Ball,
    bat: Bat,
    resCo: number = 1,
) => {
    const m1 = Math.PI * Math.pow(ball.getRadius(), 2);
    const m2 = m1;

    const u1X = ball.getXVelocity();
    const u1Y = ball.getYVelocity();
    const batSpeed = 2;
    const ballCoords = ball.getCoords();
    const batCoords = bat.getCoords();
    const angleOfAttack = Math.atan2(ballCoords.y - batCoords.y, ballCoords.x - batCoords.x);
    const u2X = batSpeed * Math.cos(angleOfAttack);
    const u2Y = batSpeed * Math.sin(angleOfAttack);
    
    ball.setVelocity(
        (m1-m2*resCo)/(m1+m2)*u1X + (1+resCo)*m2/(m1+m2)*u2X,
        (m1-m2*resCo)/(m1+m2)*u1Y + (1+resCo)*m2/(m1+m2)*u2Y
    );

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
            if (distance <= (ball.getRadius() + otherBall.getRadius())){
                calculateMassBasedCollision(ball, otherBall, 0.8);
                ball.step();
                otherBall.step();
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

        if (distance > (ball.getRadius() + bat.getRadius())) return;
        calculateBatCollision(ball, bat,);
        ball.step();


    });
}


export const calculateCanvasCollision = (
    ball: Ball, 
    canvasWidth: number, 
    canvasHeight: number
) => {
    const ballCoords = ball.getCoords();
    const ballRadius = ball.getRadius();
    const ballX = ballCoords.x;
    const ballY = ballCoords.y;

    if (
        ballX - ballRadius <= 0 
        || ballX + ballRadius >= canvasWidth
        || ballY - ballRadius <= 0 
        || ballY + ballRadius >= canvasHeight
        ) {
        ball.setDirection(180 - ball.getDirection());
    }
};

const calculateMassBasedCollision = (
    ball: Ball,
    otherBall: Ball,
    resCo: number = 1
) => {
    const m1 = Math.PI * Math.pow(ball.getRadius(), 2);
    const m2 = Math.PI * Math.pow(otherBall.getRadius(), 2);

    const u1X = ball.getXVelocity();
    const u1Y = ball.getYVelocity();
    const u2X = otherBall.getXVelocity();
    const u2Y = otherBall.getYVelocity();

    ball.setVelocity(
        (m1-m2*resCo)/(m1+m2)*u1X + (1+resCo)*m2/(m1+m2)*u2X,
        (m1-m2*resCo)/(m1+m2)*u1Y + (1+resCo)*m2/(m1+m2)*u2Y
    );
    otherBall.setVelocity(
        (m2-m1*resCo)/(m1+m2)*u2X + (1+resCo)*m1/(m1+m2)*u1X,
        (m2-m1*resCo)/(m1+m2)*u2Y + (1+resCo)*m1/(m1+m2)*u1Y
    );
};