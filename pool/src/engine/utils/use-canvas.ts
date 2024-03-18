import { useRef, useEffect, useCallback} from 'react';


const useCanvas = (
  draw: (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void,
  context: (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void,
  init?: (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => void
) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const requestRef = useRef<number>();
  useEffect(() => {
  if (canvasRef.current) {
    const ctx = canvasRef.current.getContext('2d');
  if (ctx) {
    ctx.imageSmoothingEnabled = false;
  }
  }}, []);
  
  const animate = useCallback(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;



    draw(ctx, canvasRef.current);
    requestRef.current = requestAnimationFrame(animate);
  }, [draw]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    context(ctx, canvas);
    requestRef.current = requestAnimationFrame(animate);
    if (init) {
      init(canvas, ctx);
    }
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [animate, context, init]);

  return canvasRef;
};


export default useCanvas;