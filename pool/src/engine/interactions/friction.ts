import Ball from "../render/actors/ball";


export const calculateFrictions = (type: string = 's', balls: Ball[], frCo: number = 0.005) => {
  if (type=='r') calculateRollingFrictions(balls, frCo);
  if (type=='s') calculateSlidingFrictions(balls, frCo);
}

const calculateRollingFrictions = (balls: Ball[], frCo: number = 0.05) => {
  balls.forEach(ball => {
    const acceleration = (frCo + (ball.getSpeed() * ball.getSpeed()/(ball.getRadius())));
    /*
    * Рассчёты завязаны на отрисовку кадров анимации.
    * Так как requestAnimationFrame эффективно ограничвает частоту кадров 60ю в секунду,
    * при применении ускорения следует учитывать это.
    * Оттуда деление на 60 в следующей строке.
    */ 
      const newSpeed = ball.getSpeed() - acceleration/60; 
      ball.setSpeed(newSpeed < 0 ? 0 : newSpeed); 
    });
}

const calculateSlidingFrictions = (balls: Ball[], frCo: number = 0.0002) => {
  balls.forEach(ball => {
    const acceleration = frCo;
    //Как и в случае с трением качения...
    const newSpeed = ball.getSpeed() - acceleration/60;
    ball.setSpeed(newSpeed < 0 ? 0 : newSpeed);
  });
}