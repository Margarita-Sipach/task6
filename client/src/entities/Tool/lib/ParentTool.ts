const CONTEXT_ID = "2d"

type CtxType = CanvasRenderingContext2D | null

export class Tool{
	protected canvas: HTMLCanvasElement;
	protected ctx: CtxType;

	constructor(canvas: HTMLCanvasElement){
		this.canvas = canvas;
		this.ctx = canvas?.getContext(CONTEXT_ID) || null
		this.removeListners()
	}

	removeListners(){
		this.canvas.onmouseup = null
		this.canvas.onmousedown = null
		this.canvas.onmousemove = null
	}
}