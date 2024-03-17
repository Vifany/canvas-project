import React from 'react';
import { renderCanvas } from './render/render';
import useCanvas from './utils/use-canvas';
import styled from 'styled-components';
import { clearCanvas } from './render/render';
import Ball from './render/actors/ball';
import { detectCollision, detectBatCollision } from './interactions/collision';
import Bat from './render/actors/bat';


const CanvasContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: max-content;
  width: max-content;
  border: 1px solid black;
  `;


const Canvas: React.FC = () => {
  const ball = new Ball(10,10);
  const ball2 = new Ball(100,33);
  const ball3 = new Ball(200, 100);
  const bat = new Bat(50);
  bat.setExistance(false);
  const collisionDetector = detectCollision;

  const canvasRef = useCanvas((ctx, canvas) => {
    const context = { ctx, canvas };
    if (!ctx) return;
    if (!canvas) return;
    

    const animate = () => {
      ball.setContext(context);
      ball2.setContext(context);
      ball3.setContext(context);
      bat.setContext(context);
      clearCanvas(context.ctx, context.canvas);
      renderCanvas(context, [ball.render, ball2.render, ball3.render, bat.render ]);
      collisionDetector([ball, ball2, ball3]);
      if (bat.isExists()) detectBatCollision([ball, ball2, ball3], bat);
      requestAnimationFrame(animate);
    };
    animate();
  },
  (canvas, ctx) => {
    if (!ctx) return;
    if (!canvas) return;

    const handleMouseDown = (e: MouseEvent) => {

      bat.setExistance(true);
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - bat.getRadius() / 2;
      const y = e.clientY - rect.top - bat.getRadius() / 2;
      bat.setCoords(x, y);
      console.log(bat.getCoords());
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (bat.isExists()) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left - bat.getRadius() / 2;
        const y = e.clientY - rect.top - bat.getRadius() / 2;
        bat.setCoords(x, y);
      }
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', () => {
      if (bat.isExists()) bat.setExistance(false);
    });

    // Cleanup function to remove the event listener
    return () => {
    };

  });
  return (

  <CanvasContainer>
    <canvas ref={canvasRef} width={500} height={300} />
  </CanvasContainer>
  );
};

export default Canvas;
