import { Methods, ToolTypes } from 'shared/ws/ws';

const CONTEXT_ID = '2d';

type CtxType = CanvasRenderingContext2D | null

export class Tool {
    protected canvas: HTMLCanvasElement;

    protected ctx: CtxType;

    protected ws: WebSocket;

    protected id: string;

    protected _color: string | CanvasGradient | CanvasPattern;

    protected _lineWidth: number;

    constructor(
        canvas: HTMLCanvasElement,
        ws: WebSocket,
        id: string,
    ) {
        this.canvas = canvas;
        this.ctx = canvas.getContext(CONTEXT_ID);
        this._color = this.ctx?.fillStyle || '#000';
        this._lineWidth = this.ctx?.lineWidth || 1;
        this.ws = ws;
        this.id = id;
        this.removeListners();
    }

    set color(color: string) {
        console.log(color);
        this._color = color;
    }

    set lineWidth(lineWidth: number) {
        this._lineWidth = lineWidth;
    }

    initToolProps() {
        Tool.initToolProps(this.ctx!, this.color, this.lineWidth);
        this.ctx?.beginPath();
    }

    static initToolProps(ctx: CanvasRenderingContext2D, color: any, lineWidth: number) {
		ctx!.fillStyle = color;
		ctx!.strokeStyle = color;
		ctx!.lineWidth = lineWidth;
    }

    removeListners() {
        this.canvas.onmouseup = null;
        this.canvas.onmousedown = null;
        this.canvas.onmousemove = null;
    }

    getCurrentCoordinates(e: MouseEvent): {x: number, y: number} {
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
            figure: {
                type: ToolTypes.finish,
            },
        }));
    }

    static draw(ctx: any, params: any) {

    }
}
