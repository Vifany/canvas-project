export const clearCanvas = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

export  const bouncingRect = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    let x = 0;
    let y = 0;
    let xSpeed = 5;
    let ySpeed = 5;
    const width = 50;
    const height = 50;
  
    const drawRect = (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) => {
      ctx.fillRect(x, y, width, height);
    };
  
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawRect(ctx, x, y, width, height);
      x += xSpeed;
      y += ySpeed;
  
      if (x + width > canvas.width || x < 0) {
        xSpeed = -xSpeed;
      }
      if (y + height > canvas.height || y < 0) {
        ySpeed = -ySpeed;
      }
    };
  
    return draw;
  };

