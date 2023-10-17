import { PaintTool } from 'entities/Tool';
import { makeAutoObservable } from 'mobx';

class ToolState {
    _tool: PaintTool | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    setTool(tool: PaintTool) {
        this._tool = tool;
    }
}

export default new ToolState();
