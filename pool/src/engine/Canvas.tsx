import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { renderCanvas } from './render/render';
import useCanvas from './utils/use-canvas';
import styled from 'styled-components';
import { clearCanvas } from './render/render';
import Ball from './render/actors/ball';
import { detectCollision, detectBatCollision } from './interactions/collision';
import Bat from './render/actors/bat';
import { checkPosition } from './utils/canvas-utility';


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
  onContextMenu: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  ballsR: any
}

const Canvas: React.FC<CanvasProps> = ({ 
  onContextMenu,
  ballsR
}) => {
  const balls = ballsR.current;
  const bat = new Bat(30);
  bat.setExistance(false);



  const canvasRef = useCanvas((ctx, canvas) => {

    const context = { ctx, canvas };
    if (!ctx) return;
    if (!canvas) return;
    clearCanvas (ctx, canvas);
    renderCanvas(context, [balls[0].render, balls[1].render, balls[2].render, bat.render ]);
    detectCollision(balls);
    if (bat.isExists()) detectBatCollision(balls, bat);

  },
  (ctx, canvas) => {
    const context = { ctx, canvas };
    if (!ctx) return;
    if (!canvas) return;
    balls.forEach(ball => ball.setContext(context));
    bat.setContext(context);
  },
  (canvas, ctx) => {
    if (!ctx) return;
    if (!canvas) return;

    const handleMouseDown = (e: MouseEvent) => {

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - bat.getRadius() / 2;
      const y = e.clientY - rect.top - bat.getRadius() / 2;
      console.log('click')
      if (checkPosition(balls, x, y)) {
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

  const handleContextMenu = (event: React.MouseEvent) => {
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
