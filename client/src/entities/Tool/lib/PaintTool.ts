import {
    Color, Methods, ToolTypes, TwoElementArr,
} from 'shared/ws/ws';
import { canvasState } from 'widgets/Canvas';
import { toolState } from '..';

const DATA_IMG_STR = 'data:image/png;base64,';

export class PaintTool {
    protected canvas: HTMLCanvasElement;

    protected ctx: CanvasRenderingContext2D;

    protected ws: WebSocket;

    protected id: string;

    protected _isMouseDown: boolean = false;

    protected color: Color | null = null;

    protected lineWidth: number | null = null;

    constructor() {
        this.canvas = canvasState.canvas!;
        this.ctx = canvasState.ctx!;
        this.ws = canvasState.ws;
        this.id = canvasState.sessionId;
        this.removeListeners();
        this.addListeners();
    }

    addListeners() {
        this.canvas.onmouseup = this.mouseUpHandler.bind(this);
        this.canvas.onmousedown = this.mouseDownHandler.bind(this);
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    }

    mouseUpHandler(e?: MouseEvent) { }

    mouseDownHandler(e?: MouseEvent) { }

    mouseMoveHandler(e?: MouseEvent) { }

    sendDrawMessage(e: MouseEvent) {
        this.sendMessage({
            method: Methods.draw,
            id: this.id,
            figure: {
                color: this.color || toolState.color,
                lineWidth: this.lineWidth || toolState.lineWidth,
                ...this.generateExtraParams(e),
            },
        });
    }

    generateExtraParams(e?: MouseEvent) {
        return {};
    }

    initToolParams() {
        PaintTool.initToolParams(
			this.ctx!,
			this.color || toolState.color,
			this.lineWidth || toolState.lineWidth,
        );
        this.ctx?.beginPath();
    }

    static initToolParams(
        ctx: CanvasRenderingContext2D,
        color: Color,
        lineWidth: number,
    ) {
		ctx!.fillStyle = color;
		ctx!.strokeStyle = color;
		ctx!.lineWidth = lineWidth;
    }

    removeListeners() {
        this.canvas.onmouseup = null;
        this.canvas.onmousedown = null;
        this.canvas.onmousemove = null;
    }

    getCurrentCoordinates(e: MouseEvent): { x: number, y: number } {
        return {
            x: e.offsetX,
            y: e.offsetY,
        };
    }

    finishDraw() {
        this.sendMessage({
            method: Methods.draw,
            id: this.id,
            img: this.canvas.toDataURL().replace(DATA_IMG_STR, ''),
            figure: {
                type: ToolTypes.finish,
            },
        });
    }

    sendMessage(obj: any) {
        this.ws.send(JSON.stringify(obj));
    }

    static draw(ctx: CanvasRenderingContext2D, params: object) { }
}
