import Ball from "../render/actors/ball";
import Bat from "../render/actors/bat";


export const collisions = (
    balls: Ball[], 
    bat: Bat,
    canvasWidth: number,
    canvasHeight: number,
    resCo: number = 1
) => {
    if (bat.isExists()){
        detectBatCollision(balls, bat, resCo);
    }
    detectCollision(balls, resCo);
    const canvasCo = 1-(1-resCo)/2;
    detectCanvasCollision(balls, canvasCo, canvasWidth, canvasHeight)
    }



const calculateBatCollision = (
    ball: Ball,
    bat: Bat,
    resCo: number = 1,
) => {
    const m1 = Math.PI * Math.pow(ball.getRadius(), 2);
    const m2 = m1;

    const u1X = ball.getXVelocity();
    const u1Y = ball.getYVelocity();
    const batSpeed = 1;
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


const detectCollision = (balls: Ball[], resCo: number) => {
    balls.forEach((ball, index) => {
        balls.forEach((otherBall, otherIndex) => {
            if (
                otherIndex <= index 
                || !otherBall.isCollidable() 
                || !ball.isCollidable()
            )
                return;
            const calculateDistance = (ball: Ball, otherBall: Ball) => {
                const ballCoords: { x: number, y: number } = ball.getCoords();
                const otherCoords: { x: number, y: number } = otherBall.getCoords();
                const dx = ballCoords.x - otherCoords.x;
                const dy = ballCoords.y - otherCoords.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                return distance;
            };

            if (calculateDistance(ball, otherBall) <= (ball.getRadius() + otherBall.getRadius())) {
                if (calculateDistance(ball, otherBall) < ball.getRadius())
                    ball.push(otherBall.getRadius());
                calculateMassBasedCollision(ball, otherBall, resCo);
            }

        });
    });
};


const detectBatCollision = (balls: Ball[], bat: Bat, resCo: number) => {
    balls.forEach((ball) => {

        const ballCoords:{x:number, y:number} = ball.getCoords();
        const batCoords:{x:number, y:number} = bat.getCoords();
        const dx = ballCoords.x - batCoords.x;
        const dy = ballCoords.y - batCoords.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > (ball.getRadius() + bat.getRadius())) return;
        calculateBatCollision(ball, bat, resCo);
        //Уменьшает частоту пересечения шара с битой - делает ускорение битой менее резким
        ball.step();


    });
}

const detectCanvasCollision = (balls: Ball[], resCo:number, width: number, height: number) => {

    balls.forEach((ball) => {
        calculateCanvasCollision(ball, width, height, resCo);
        ball.step();
    });
}


const calculateCanvasCollision = (
    ball: Ball, 
    canvasWidth: number, 
    canvasHeight: number,
    resCo: number = 1
) => {
    const ballCoords = ball.getCoords();
    const ballRadius = ball.getRadius();
    const ballX = ballCoords.x;
    const ballY = ballCoords.y;

    if (ballX - ballRadius <= 0 || ballX + ballRadius >= canvasWidth) {
        ball.setVelocity(-ball.getXVelocity() * resCo, ball.getYVelocity());
    }

    if (ballY - ballRadius <= 0 || ballY + ballRadius >= canvasHeight) {
        ball.setVelocity(ball.getXVelocity(), -ball.getYVelocity() * resCo);
    }
    ball.step();
    if (ballX < 0 || ballX > canvasWidth) {
        ball.teleport(canvasWidth/2, canvasHeight/2);
    }

    if (ballY< 0 || ballY > canvasHeight) {
        ball.teleport(canvasWidth/2, canvasHeight/2);
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