import { useRef, useEffect} from 'react';

const useCanvas = (
  draw: (
    ctx: CanvasRenderingContext2D, 
    canvas: HTMLCanvasElement
  ) => void,
  init?: (
    canvas: HTMLCanvasElement, 
    ctx: CanvasRenderingContext2D
  ) => void
)=> {
   
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      if (init) {
        init(canvas, ctx);
      }
      draw(ctx, canvas);

    }, [draw, init]);
  return canvasRef;
};

export default useCanvas;