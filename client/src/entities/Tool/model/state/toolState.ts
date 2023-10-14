import { makeAutoObservable } from "mobx";

class ToolState{

	_tool = null

	constructor(){
		makeAutoObservable(this)
	}

	setTool(tool: any){
		this._tool = tool
	}
}

export default new ToolState()