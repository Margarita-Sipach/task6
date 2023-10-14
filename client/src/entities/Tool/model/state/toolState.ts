import { Tool } from "entities/Tool/lib/ParentTool";
import { makeAutoObservable } from "mobx";

class ToolState{

	_tool: Tool | null = null

	constructor(){
		makeAutoObservable(this)
	}

	setTool(tool: Tool){
		this._tool = tool
	}

	setColor(color: string){
		console.log(color, this._tool)
		if(this._tool) this._tool.color = color
	}

	setWidth(width: number){
		console.log(width, this._tool)
		if(this._tool) this._tool.width = width
	}
}

export default new ToolState()