export enum Methods {
	connect = 'connect',
	draw = 'draw',
}

export enum ToolTypes {
	brush = 'brush',
	rectangle = 'rectangle',
	finish = 'finish'
}

export type Color = string | CanvasGradient | CanvasPattern;

export interface FigureParams{
	color: Color;
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

export type TwoElementArr = [number, number]
