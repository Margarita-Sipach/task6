import { FigureParams, Methods, ToolTypes } from 'shared/ws/ws';
import { Tool } from './ParentTool';

export class Rectangle extends Tool {
    private _isMouseDown: boolean = false;

    private _startX: number = 0;

    private _startY: number = 0;

    private _prevCanvas: string = '';

    _width: number = 0;

    _height: number = 0;

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
                type: ToolTypes.rectangle,
                color: this._color,
                width: this._lineWidth,
                coordinates: {
                    x: this._startX,
                    y: this._startY,
                },
                sizes: {
                    width: this._width,
                    height: this._height,
                },
            },
        }));
        this.finishDraw();
    }

    mouseDownHandler(e: MouseEvent) {
        this._isMouseDown = true;
        this.initToolProps();
        [this._startX, this._startY] = Object.values(this.getCurrentCoordinates(e));
        this._prevCanvas = this.canvas.toDataURL();
    }

    mouseMoveHandler(e: MouseEvent) {
        if (this._isMouseDown) {
            const { x, y } = this.getCurrentCoordinates(e);
            this._width = x - this._startX;
            this._height = y - this._startY;
            this.draw(this._startX, this._startY, this._width, this._height);
        }
    }

    draw(x: number, y: number, width: number, height: number) {
        const img = new Image();
        img.src = this._prevCanvas;
        img.onload = () => {
            this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx?.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
            this.ctx?.beginPath();
            this.ctx?.rect(x, y, width, height);
            this.ctx?.fill();
        };
    }

    static draw(
        ctx: any,
        {
            coordinates, sizes, color, lineWidth,
        }: FigureParams,
    ) {
        Rectangle.initToolProps(ctx, color, lineWidth);
        ctx?.rect(...Object.values(coordinates), ...Object.values(sizes!));
        ctx?.fill();
    }
}
