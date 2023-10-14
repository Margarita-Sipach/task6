const CONTEXT_ID = '2d';

type CtxType = CanvasRenderingContext2D | null

export class Tool {
    protected canvas: HTMLCanvasElement;

    protected ctx: CtxType;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext(CONTEXT_ID);
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

    getCurrentCoordinates(e: MouseEvent): [number, number] {
        const target = e.target as HTMLElement;
        return [
            e.pageX - target.offsetLeft,
            e.pageY - target.offsetTop,
        ];
    }
}
