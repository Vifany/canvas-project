import React, { useRef, useEffect } from 'react';
import { clearCanvas, drawRect, bouncingRect } from './canvasActions/canvas-utility';
import useCanvas from './use-canvas';
import styled from 'styled-components';


const CanvasContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: max-content;
  width: max-content;
  border: 1px solid black;
  `;


const Canvas: React.FC = () => {
  
  const canvasRef = useCanvas((ctx, canvas) => {
    const draw = bouncingRect(ctx, canvas);

    const animate = () => {
      draw();
      requestAnimationFrame(animate);
      
    };
    animate();
  }
  );

  return (
  <CanvasContainer>
    <canvas ref={canvasRef} width={500} height={300} />
  </CanvasContainer>
  );
};

export default Canvas;