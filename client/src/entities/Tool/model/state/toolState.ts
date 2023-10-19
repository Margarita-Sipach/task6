import { PaintTool } from 'entities/Tool';
import { makeAutoObservable } from 'mobx';
import { Color } from 'shared/ws/ws';

const DEFAULT_COLOR = '#000';
const DEFAULT_LINE_WIDTH = 1;

class ToolState {
    _tool: PaintTool | null = null;

    _color: Color = DEFAULT_COLOR;

    _lineWidth: number = DEFAULT_LINE_WIDTH;

    constructor() {
        makeAutoObservable(this);
    }

    setTool(tool: PaintTool) {
        this._tool = tool;
    }

    setColor(color: Color) {
        this._color = color;
    }

    setLineWidth(lineWidth: number) {
        this._lineWidth = lineWidth;
    }

    get color() {
        return this._color;
    }

    get lineWidth() {
        return this._lineWidth;
    }
}

export default new ToolState();
