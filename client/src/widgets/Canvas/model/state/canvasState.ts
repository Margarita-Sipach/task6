import { makeAutoObservable } from 'mobx';
import { TwoElementArr } from 'shared/ws/ws';

export type CanvasType = null | HTMLCanvasElement

class CanvasState {
    private _canvas: CanvasType = null;

    private _ws: WebSocket = new WebSocket(__WS__);

    private _boards: {[id: string]: string} = {};

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

    get boards() {
        return this._boards;
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

    setBoards(boards: {[id: string]: string}) {
        this._boards = boards;
    }

    setBoard(id: string, img: string) {
        this._boards[id] = img;
    }

    get canvasSizes(): TwoElementArr {
        return [this._canvas!.width, this._canvas!.height];
    }

    setCanvasImg(src: string, fn?: (ctx: any) => void) {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            if (this.canvas) {
                this.ctx?.clearRect(0, 0, ...this.canvasSizes);
                this.ctx?.drawImage(img, 0, 0, ...this.canvasSizes);
                fn?.(this.ctx);
            }
        };
    }
}

export default new CanvasState();
