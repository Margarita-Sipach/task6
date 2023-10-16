import { makeAutoObservable } from 'mobx';

export type CanvasType = null | HTMLCanvasElement

class CanvasState {
    private _canvas: CanvasType = null;

    private _ws: WebSocket = new WebSocket(__API__.replace('http', 'ws'));

    private _sessionId: string = '';

    constructor() {
        makeAutoObservable(this);
    }

    get canvas() {
        return this._canvas;
    }

    get ctx() {
        return this._canvas?.getContext('2d');
    }

    get ws() {
        return this._ws;
    }

    get sessionId() {
        return this._sessionId;
    }

    setWs(ws: WebSocket) {
        this._ws = ws;
    }

    setSessionId(sessionId: string) {
        this._sessionId = sessionId;
    }

    setCanvas(canvas: CanvasType) {
        this._canvas = canvas;
    }
}

export default new CanvasState();
