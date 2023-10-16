import { FC, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { FigureParams, Methods, ToolTypes } from 'shared/ws/ws';
import { Brush, PaintTool, Rectangle } from 'entities/Tool';
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
            const { figure } = params;
            const { type, ...figureParams }: Figure = figure;
            switch (type) {
            case ToolTypes.finish: canvasState.ctx.beginPath();
                break;
            default: (Tools[type] as typeof PaintTool).draw(canvasState.ctx, figureParams);
                break;
            }
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            canvasState.setCanvas(canvas);
        }

        canvasState.setWs(new WebSocket(__API__.replace('http', 'ws')));
        const { ws } = canvasState;
        canvasState.setSessionId(id);

        ws.onopen = () => {
            ws.send(JSON.stringify({
                id,
                method: Methods.connect,
            }));
            ws.onmessage = (msg) => {
                const { method, ...msgParams } = JSON.parse(msg.data);
                switch (method) {
                case Methods.connect: console.log(msgParams.msg);
                    break;
                case Methods.draw: drawHandler(msgParams);
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
