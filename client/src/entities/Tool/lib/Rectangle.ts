import { FigureParams, ToolTypes, TwoElementArr } from 'shared/ws/ws';
import { canvasState } from 'widgets/Canvas';
import { PaintTool } from './PaintTool';

export class Rectangle extends PaintTool {
    private _startX: number = 0;

    private _startY: number = 0;

    private _prevCanvas: string = '';

    _width: number = 0;

    _height: number = 0;

    mouseUpHandler(e: MouseEvent) {
        this._isMouseDown = false;
        this.sendDrawMessage(e);
        this.finishDraw();
    }

    generateExtraParams() {
        return {
            type: ToolTypes.rectangle,
            coordinates: {
                x: this._startX,
                y: this._startY,
            },
            sizes: {
                width: this._width,
                height: this._height,
            },
        };
    }

    mouseDownHandler(e: MouseEvent) {
        this._isMouseDown = true;
        this.initToolParams();
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
        canvasState.setCanvasImg(this._prevCanvas, (ctx) => {
            ctx?.beginPath();
            ctx?.rect(x, y, width, height);
            ctx?.fill();
        });
    }

    static draw(
        ctx: CanvasRenderingContext2D,
        {
            coordinates, sizes, color, lineWidth,
        }: FigureParams,
    ) {
        Rectangle.initToolParams(ctx, color, lineWidth);
        ctx?.rect(
            ...Object.values(coordinates) as TwoElementArr,
            ...Object.values(sizes!) as TwoElementArr,
        );
        ctx?.fill();
    }
}
