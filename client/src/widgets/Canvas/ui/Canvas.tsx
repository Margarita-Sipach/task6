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

    const connectHandler = useCallback(({ img }) => {
        canvasState.setCanvasImg(DATA_IMG_STR + img);
        setTimeout(() => alert('new user'), 500);
    }, []);

    const msgHandler = useCallback((msg: { data: string; }) => {
        const { method, ...msgParams } = JSON.parse(msg.data);

        canvasState.updateURL();
        switch (method) {
        case Methods.connect: return connectHandler(msgParams);
        case Methods.draw: return drawHandler(msgParams);
        default:
        }
    }, [connectHandler]);

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
                img: canvasState.url.replace(DATA_IMG_STR, ''),
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
