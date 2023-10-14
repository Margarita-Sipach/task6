import { Tool } from './ParentTool';

export class Brush extends Tool {
    private _isMouseDown: boolean = false;

    constructor(canvas: HTMLCanvasElement) {
        super(canvas);
        this.addListners();
    }

    addListners() {
        this.canvas.onmouseup = this.mouseUpHandler.bind(this);
        this.canvas.onmousedown = this.mouseDownHandler.bind(this);
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    }

    mouseUpHandler() {
        this._isMouseDown = false;
    }

    mouseDownHandler(e: MouseEvent) {
        this._isMouseDown = true;
        this.ctx?.beginPath();
        this.ctx?.moveTo(...this.getCurrentCoordinates(e));
    }

    mouseMoveHandler(e: MouseEvent) {
        if (this._isMouseDown) {
            this.draw(...this.getCurrentCoordinates(e));
        }
    }

    draw(x: number, y: number) {
        this.ctx?.lineTo(x, y);
        this.ctx?.stroke();
    }
}
