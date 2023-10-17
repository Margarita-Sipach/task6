import {
    Color, Methods, ToolTypes, TwoElementArr,
} from 'shared/ws/ws';

const CONTEXT_ID = '2d';
const DEFAULT_COLOR = '#000';
const DEFAULT_LINE_WIDTH = 1;

const DATA_IMG_STR = 'data:image/png;base64,';

export class PaintTool {
    protected canvas: HTMLCanvasElement;

    protected ctx: CanvasRenderingContext2D;

    protected ws: WebSocket;

    protected id: string;

    static color: Color;

    static lineWidth: number;

    protected _isMouseDown: boolean = false;

    constructor(
        canvas: HTMLCanvasElement,
        ws: WebSocket,
        id: string,
    ) {
        this.canvas = canvas;
        this.ctx = canvas.getContext(CONTEXT_ID)!;
        PaintTool.color = this.ctx?.fillStyle || DEFAULT_COLOR;
        PaintTool.lineWidth = this.ctx?.lineWidth || DEFAULT_LINE_WIDTH;
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

    sendDrawMessage(e: MouseEvent) {
        this.ws.send(JSON.stringify({
            method: Methods.draw,
            id: this.id,
            figure: {
                color: PaintTool.color,
                lineWidth: PaintTool.lineWidth,
                ...this.generateExtraParams(e),
            },
        }));
    }

    generateExtraParams(e?: MouseEvent) {
        return {};
    }

    initToolParams() {
        PaintTool.initToolParams(this.ctx!, PaintTool.color, PaintTool.lineWidth);
        this.ctx?.beginPath();
    }

    getCanvasURL() {
        return { img: this.canvas.toDataURL().replace(DATA_IMG_STR, '') };
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
            img: this.canvas.toDataURL().replace(DATA_IMG_STR, ''),
            figure: {
                type: ToolTypes.finish,
            },
        }));
    }

    get canvasSizes(): TwoElementArr {
        return [this.canvas.width, this.canvas.height];
    }

    setCanvasImg(imgName: string) {
        const img = new Image();
        img.src = DATA_IMG_STR + imgName;
        img.onload = () => {
            console.log(this.canvas, this.canvasSizes);
            if (this.canvas) {
                this.ctx?.clearRect(0, 0, ...this.canvasSizes);
                this.ctx?.drawImage(img, 0, 0, ...this.canvasSizes);
            }
        };
    }

    static draw(ctx: CanvasRenderingContext2D, params: object) {}
}
