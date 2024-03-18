import React from 'react';
import { renderCanvas } from './render/render';
import useCanvas from './utils/use-canvas';
import styled from 'styled-components';
import { clearCanvas } from './render/render';
import Ball from './render/actors/ball';
import {collisions} from './interactions/collision';
import Bat from './render/actors/bat';
import { checkPosition } from './utils/canvas-utility';
import { calculateFrictions } from './interactions/friction';


const CanvasContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  `;



const FieldBorder = styled.div`
  position: absolute;
  z-index: 20;
  background: transparent;
  width: 700px;
  height: 450px;
  border: 10px solid brown;
  border-radius: 10px;
  pointer-events: none;
`;
interface CanvasProps {
  onContextMenu: (e: MouseEvent) => void;
  ballsR: React.RefObject<Ball[]>;
  selectedBall: React.RefObject<{ball:Ball | null}>;
}

const Canvas: React.FC<CanvasProps> = ({ 
  onContextMenu,
  ballsR,
  selectedBall
}) => {
  const balls = ballsR.current;
  const bat = new Bat(30);
  bat.setExistance(false);



  const canvasRef = useCanvas((ctx, canvas) => {

    const context = { ctx, canvas };
    if (!ctx) return;
    if (!canvas) return;
    if (!balls) return;
    clearCanvas (ctx, canvas);
    renderCanvas(context, [balls[0].render, balls[1].render, balls[2].render, bat.render ]);
    collisions(balls, bat, canvas.width, canvas.height, 0.9);
    calculateFrictions(balls, 0.0002);

  },
  (ctx, canvas) => {
    const context = { ctx, canvas };
    if (!ctx) return;
    if (!canvas) return;
    if (!balls) return;
    balls.forEach(ball => ball.setContext(context));
    bat.setContext(context);
  },
  (canvas, ctx) => {
    if (!ctx) return;
    if (!canvas) return;
    if (!balls) return;

    const handleMouseDown = (e: MouseEvent) => {

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - bat.getRadius() / 2;
      const y = e.clientY - rect.top - bat.getRadius() / 2;
      if (!selectedBall.current) return;
      selectedBall.current.ball = checkPosition(balls, x, y)

      if (selectedBall.current.ball !== null) {
        handleContextMenu(e);
        return;
      }
      bat.setExistance(true);
      bat.setCoords(x, y);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (bat.isExists()) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left - bat.getRadius() / 2;
        const y = e.clientY - rect.top - bat.getRadius() / 2;
        bat.setCoords(x, y);
      }
    };
    const handleMouseUp = (e: MouseEvent) => {

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - bat.getRadius() / 2;
      const y = e.clientY - rect.top - bat.getRadius() / 2;
      bat.setCoords(x, y);
      bat.setExistance(false);
    }

    canvas.addEventListener(
      'mousedown', 
      handleMouseDown
      );
    canvas.addEventListener(
      'mousemove', 
      handleMouseMove
      );
    canvas.addEventListener(
      'mouseup', 
      handleMouseUp
      );
  }
  );

  const handleContextMenu = (event: MouseEvent) => {
    event.preventDefault();
    onContextMenu(event);
  };

  return (
    
    <CanvasContainer>
      <canvas ref={canvasRef} 
      width={703} 
      height={453} 
      style = {{
        background: 'green', 
        zIndex: 10, 
        display: 'block'
      }}
      />
      <FieldBorder />
    </CanvasContainer>
  );
};

export default Canvas;
