import { ToolTypes, Methods, FigureParams } from 'shared/ws/ws';
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
        this.finishDraw();
    }

    mouseDownHandler(e: MouseEvent) {
        this._isMouseDown = true;
        this.initToolProps();
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
                    color: this._color,
                    lineWidth: this._lineWidth,
                    coordinates: this.getCurrentCoordinates(e),
                },
            }));
        }
    }

    static draw(
        ctx: CanvasRenderingContext2D,
        { coordinates, color, lineWidth }: FigureParams,
    ) {
        Brush.initToolProps(ctx, color, lineWidth);
        ctx!.lineTo(...Object.values(coordinates) as [number, number]);
        ctx!.stroke();
    }
}
