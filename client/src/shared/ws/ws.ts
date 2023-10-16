export enum Methods {
	connect = 'connect',
	draw = 'draw',
}

export enum ToolTypes {
	brush = 'brush',
	rectangle = 'rectangle',
	finish = 'finish'
}

export interface FigureParams{
	color: any;
	lineWidth: number
	coordinates: {
		x: number,
		y: number
	},
	sizes?: {
		width: number,
		height: number
	}
}
