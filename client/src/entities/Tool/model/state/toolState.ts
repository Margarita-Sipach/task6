import { PaintTool } from 'entities/Tool';
import { makeAutoObservable } from 'mobx';

class ToolState {
    _tool: PaintTool | null = null;

    _color: string = '';

    _width: number = 0;

    constructor() {
        makeAutoObservable(this);
    }

    setTool(tool: PaintTool) {
        this._tool = tool;
        this._tool.color = this._color;
        this._tool.lineWidth = this._width;
    }

    setColor(color: string) {
        this._color = color;
        if (this._tool) this._tool.color = color;
    }

    setWidth(width: number | string) {
        this._width = +width;
        if (this._tool) this._tool.lineWidth = +width;
    }
}

export default new ToolState();
