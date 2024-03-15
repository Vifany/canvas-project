import { useRef, useEffect} from 'react';

const useCanvas = (
  draw: (
    ctx: CanvasRenderingContext2D, 
    canvas: HTMLCanvasElement
  ) => void)=> {
   
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
  
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      draw(ctx, canvas);

    }, []);
  return canvasRef;
};

export default useCanvas;