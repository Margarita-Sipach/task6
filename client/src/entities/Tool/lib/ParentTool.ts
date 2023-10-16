const CONTEXT_ID = '2d';

type CtxType = CanvasRenderingContext2D | null

export class Tool {
    protected canvas: HTMLCanvasElement;

    protected ctx: CtxType;

    protected ws: WebSocket;

    protected id: string;

    constructor(
        canvas: HTMLCanvasElement,
        ws: WebSocket,
        id: string,
    ) {
        this.canvas = canvas;
        this.ctx = canvas.getContext(CONTEXT_ID);
        this.ws = ws;
        this.id = id;
        this.removeListners();
    }

    set color(color: string) {
		this.ctx!.fillStyle = color;
		this.ctx!.strokeStyle = color;
    }

    set width(width: number) {
		this.ctx!.lineWidth = width;
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
}
