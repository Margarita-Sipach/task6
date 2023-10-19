import { FC, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { FigureParams, Methods, ToolTypes } from 'shared/ws/ws';
import {
    Brush, PaintTool, Rectangle, toolState,
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
            case ToolTypes.finish: canvasState.ctx.beginPath();
                break;
            default: (Tools[type] as typeof PaintTool)
                .draw(canvasState.ctx, figureParams);
                break;
            }
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            canvasState.setCanvas(canvas);
        }

        canvasState.setSessionId(id);

        const ws = new WebSocket(__WS__);
        ws.onopen = () => {
            ws.send(JSON.stringify({
                id,
                img: PaintTool.getCanvasURL(canvas),
                method: Methods.connect,
            }));
            ws.onmessage = (msg) => {
                const { method, ...msgParams } = JSON.parse(msg.data);
                switch (method) {
                case Methods.connect: alert('new user');
                    break;
                case Methods.draw: drawHandler(msgParams);
                    break;
                case Methods.sendBoards: {
                    const img = DATA_IMG_STR + msgParams.boards[id];
                    canvasState.setCanvasImg(img);
                }
                    break;
                default: break;
                }
            };
        };
    }, [id]);

    return (
        <div className={cls.Canvas}>
            <canvas width={1000} height={700} ref={canvasRef} />
        </div>
    );
});
