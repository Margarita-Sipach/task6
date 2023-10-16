import { ToolTypes, Methods } from 'shared/ws/ws';
import { Tool } from './ParentTool';

export class Brush extends Tool {
    private _isMouseDown: boolean = false;

    constructor(
        canvas: HTMLCanvasElement,
        ws: WebSocket,
        id: string,
    ) {
        super(canvas, ws, id);
        this.addListners();
    }

    addListners() {
        this.canvas.onmouseup = this.mouseUpHandler.bind(this);
        this.canvas.onmousedown = this.mouseDownHandler.bind(this);
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    }

    mouseUpHandler() {
        this._isMouseDown = false;
        this.ws.send(JSON.stringify({
            method: Methods.draw,
            id: this.id,
            figure: {
                type: ToolTypes.finish,
            },
        }));
    }

    mouseDownHandler(e: MouseEvent) {
        this._isMouseDown = true;
        this.ctx?.beginPath();
        const coordinates = Object.values(this.getCurrentCoordinates(e)) as [number, number];
        this.ctx?.moveTo(...coordinates);
    }

    mouseMoveHandler(e: MouseEvent) {
        if (this._isMouseDown) {
            this.ws.send(JSON.stringify({
                method: Methods.draw,
                id: this.id,
                figure: {
                    type: ToolTypes.brush,
                    coordinates: this.getCurrentCoordinates(e),
                },
            }));
        }
    }

    static draw(
        ctx: CanvasRenderingContext2D,
        { x, y }: {x: number, y: number},
    ) {
        ctx?.lineTo(x, y);
        ctx?.stroke();
    }
}
