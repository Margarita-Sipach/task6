import { FigureParams, ToolTypes, TwoElementArr } from 'shared/ws/ws';
import { PaintTool } from './PaintTool';

export class Brush extends PaintTool {
    mouseUpHandler() {
        this._isMouseDown = false;
        this.finishDraw();
    }

    mouseDownHandler(e: MouseEvent) {
        this._isMouseDown = true;
        this.initToolParams();
        const coordinates = Object.values(this.getCurrentCoordinates(e));
        this.ctx?.moveTo(...coordinates as TwoElementArr);
    }

    mouseMoveHandler(e: MouseEvent) {
        if (this._isMouseDown) {
            this.sendDrawMessage(e);
        }
    }

    generateExtraParams(e: MouseEvent): {} {
        return {
            type: ToolTypes.brush,
            coordinates: this.getCurrentCoordinates(e),
        };
    }

    static draw(
        ctx: CanvasRenderingContext2D,
        { coordinates, color, lineWidth }: FigureParams,
    ) {
        Brush.initToolParams(ctx, color, lineWidth);
		ctx!.lineTo(...Object.values(coordinates) as TwoElementArr);
		ctx!.stroke();
    }
}
