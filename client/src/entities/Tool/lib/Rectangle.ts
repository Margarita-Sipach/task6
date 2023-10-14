import { Tool } from "./ParentTool";

export class Rectangle extends Tool{

	private _isMouseDown: boolean = false;
	private _startX: number = 0;
	private _startY: number = 0;
	private _prevCanvas: string = '';

	constructor(canvas: HTMLCanvasElement){
		super(canvas)
		this.addListners()
	}

	addListners(){
		this.canvas.onmouseup = this.mouseUpHandler.bind(this)
		this.canvas.onmousedown = this.mouseDownHandler.bind(this)
		this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
	}

	mouseUpHandler(){
        this._isMouseDown = false
	}

	mouseDownHandler(e: MouseEvent){
		this._isMouseDown = true
		this.ctx?.beginPath();
		[this._startX, this._startY] = this.getStartCoordinates(e)
		this._prevCanvas = this.canvas.toDataURL()
	}

	mouseMoveHandler(e: MouseEvent){
		if(this._isMouseDown){
			const [currentX, currentY] = this.getStartCoordinates(e)
			const [width, height] = [currentX - this._startX, currentY - this._startY]
			this.draw(this._startX, this._startY, width, height)
		}
	}

	getStartCoordinates(e: MouseEvent): [number, number]{
		const target = e.target as HTMLElement
		return [
			e.pageX - target.offsetLeft,
			e.pageY - target.offsetTop
		]
	}

	draw(x: number, y: number, width: number, height: number){
		const img = new Image()
		img.src = this._prevCanvas;
		img.onload = () => {
			this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.ctx?.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
			this.ctx?.beginPath()
			this.ctx?.rect(x, y, width, height);
		    this.ctx?.fill()
			console.log('load')
		}	
	}
}