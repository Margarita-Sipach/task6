import { Tool } from 'entities/Tool/lib/ParentTool';
import { makeAutoObservable } from 'mobx';

class ToolState {
    _tool: Tool | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    setTool(tool: Tool) {
        this._tool = tool;
    }

    setColor(color: string) {
        if (this._tool) this._tool.color = color;
    }

    setWidth(width: string | number) {
        if (this._tool) this._tool.width = +width;
    }
}

export default new ToolState();
