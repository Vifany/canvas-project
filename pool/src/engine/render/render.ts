import { CanvasContext } from "../utils/types";

export const clearCanvas = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};

export const renderCanvas = (context: CanvasContext, renderStack: CallableFunction[]) => {

    renderStack.forEach((render) => render(context));
};
