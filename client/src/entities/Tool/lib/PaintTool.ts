import {
    Color, Methods, ToolTypes, TwoElementArr,
} from 'shared/ws/ws';

const CONTEXT_ID = '2d';
const DEFAULT_COLOR = '#000';
const DEFAULT_LINE_WIDTH = 1;

export class PaintTool {
    protected canvas: HTMLCanvasElement;

    protected ctx: CanvasRenderingContext2D;

    protected ws: WebSocket;

    protected id: string;

    protected _color: Color;

    protected _lineWidth: number;

    protected _isMouseDown: boolean = false;

    constructor(
        canvas: HTMLCanvasElement,
        ws: WebSocket,
        id: string,
    ) {
        this.canvas = canvas;
        this.ctx = canvas.getContext(CONTEXT_ID)!;
        this._color = this.ctx?.fillStyle || DEFAULT_COLOR;
        this._lineWidth = this.ctx?.lineWidth || DEFAULT_LINE_WIDTH;
        this.ws = ws;
        this.id = id;
        this.removeListners();
        this.addListners();
    }

    addListners() {
        this.canvas.onmouseup = this.mouseUpHandler.bind(this);
        this.canvas.onmousedown = this.mouseDownHandler.bind(this);
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    }

    mouseUpHandler(e?: MouseEvent) {}

    mouseDownHandler(e?: MouseEvent) {}

    mouseMoveHandler(e?: MouseEvent) {}

    set color(color: string) {
        this._color = color;
    }

    set lineWidth(lineWidth: number) {
        this._lineWidth = lineWidth;
    }

    sendDrawMessage(e: MouseEvent) {
        this.ws.send(JSON.stringify({
            method: Methods.draw,
            id: this.id,
            figure: {
                color: this._color,
                lineWidth: this._lineWidth,
                ...this.generateExtraParams(e),
            },
        }));
    }

    generateExtraParams(e?: MouseEvent) {
        return {};
    }

    initToolParams() {
        PaintTool.initToolParams(this.ctx!, this.color, this.lineWidth);
        this.ctx?.beginPath();
    }

    getCanvasURL() {
        return { img: this.canvas.toDataURL().replace('data:image/png;base64,', '') };
    }

    static initToolParams(ctx: CanvasRenderingContext2D, color: Color, lineWidth: number) {
		ctx!.fillStyle = color;
		ctx!.strokeStyle = color;
		ctx!.lineWidth = lineWidth;
    }

    removeListners() {
        this.canvas.onmouseup = null;
        this.canvas.onmousedown = null;
        this.canvas.onmousemove = null;
    }

    getCurrentCoordinates(e: MouseEvent): { x: number, y: number } {
        const target = e.target as HTMLElement;
        return {
            x: e.pageX - target.offsetLeft,
            y: e.pageY - target.offsetTop,
        };
    }

    finishDraw() {
        this.ws.send(JSON.stringify({
            method: Methods.draw,
            id: this.id,
            img: this.canvas.toDataURL().replace('data:image/png;base64,', ''),
            figure: {
                type: ToolTypes.finish,
            },
        }));
    }

    // sendCanvasImg(){
    // 	this.ws.send(JSON.stringify({
    // 		method: 'setImg',
    // 		id: this.id,
    // 		img: this.canvas.toDataURL().replace('data: image/png;base64', '')
    // 	}))
    // }

    static draw(ctx: CanvasRenderingContext2D, params: object) {}
}
