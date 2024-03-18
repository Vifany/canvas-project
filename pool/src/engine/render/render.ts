import { CanvasContext } from "../utils/types";
// import Ball from "./actors/ball";
// import Bat from "./actors/bat";

export const clearCanvas = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};

export const renderCanvas = (context: CanvasContext, renderStack: CallableFunction[]) => {

    renderStack.forEach((render) => render(context));
};

export const render = (context: CanvasContext, renderStack: CallableFunction[]) => {

    renderStack.forEach((render) => render(context));
};
