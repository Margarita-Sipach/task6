import {
    FC, useCallback, useEffect, useRef,
} from 'react';
import { observer } from 'mobx-react-lite';
import { FigureParams, Methods, ToolTypes } from 'shared/ws/ws';
import {
    Brush, Rectangle,
} from 'entities/Tool';
import { DATA_IMG_STR } from 'shared/const/image';
import canvasState from '../model/state/canvasState';
import cls from './Canvas.module.scss';

interface CanvasProps {
	id: string
}

interface Figure extends FigureParams{
	type: ToolTypes
}

const Tools = {
    [ToolTypes.brush]: Brush,
    [ToolTypes.rectangle]: Rectangle,
};

export const Canvas: FC<CanvasProps> = observer(({ id }) => {
    const canvasRef = useRef(null);

    const drawHandler = (params: {type: ToolTypes, figure: Figure}) => {
        if (canvasState.ctx) {
            const { type, ...figureParams }: Figure = params.figure;
            switch (type) {
            case ToolTypes.finish: return canvasState.ctx.beginPath();
            default: return Tools[type].draw(canvasState.ctx, figureParams);
            }
        }
    };

    const connectHandler = useCallback(() => alert('new user'), []);

    const sendBoardsHandler = useCallback(({ boards }: any) => {
        const img = DATA_IMG_STR + boards[id];
        canvasState.setCanvasImg(img);
    }, [id]);

    const msgHandler = useCallback((msg: { data: string; }) => {
        const { method, ...msgParams } = JSON.parse(msg.data);
        switch (method) {
        case Methods.connect: return connectHandler();
        case Methods.draw: return drawHandler(msgParams);
        case Methods.sendBoards: return sendBoardsHandler(msgParams);
        default:
        }
    }, [connectHandler, sendBoardsHandler]);

    const canvasHandler = useCallback(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            canvasState.setCanvas(canvas);
        }
        canvasState.setSessionId(id);
    }, [id]);

    useEffect(() => {
        canvasHandler();

        const ws = new WebSocket(__WS__);
        ws.onopen = () => {
            ws.send(JSON.stringify({
                id,
                img: canvasState.canvasURL,
                method: Methods.connect,
            }));
            ws.onmessage = msgHandler;
        };
    }, [id, canvasHandler, msgHandler]);

    return (
        <div className={cls.Canvas}>
            <canvas width={1000} height={700} ref={canvasRef} />
        </div>
    );
});
