import { makeAutoObservable } from 'mobx';

export type CanvasType = null | HTMLCanvasElement

class CanvasState {
    private _canvas: CanvasType = null;

    constructor() {
        makeAutoObservable(this);
    }

    get canvas() {
        return this._canvas;
    }

    setCanvas(canvas: CanvasType) {
        this._canvas = canvas;
    }
}

export default new CanvasState();
