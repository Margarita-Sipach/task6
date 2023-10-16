import { FC, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { Methods, ToolTypes } from 'shared/ws/ws';
import { Brush } from 'entities/Tool/lib/Brush';
import { Rectangle } from 'entities/Tool/lib/Rectangle';
import canvasState from '../model/state/canvasState';
import cls from './Canvas.module.scss';

interface CanvasProps {
	id: string
}

export const Canvas: FC<CanvasProps> = observer(({ id }) => {
    const canvasRef = useRef(null);

    const drawHandler = (params: any) => {
        if (canvasState.ctx) {
            const { figure } = params;
            const { coordinates } = figure;
            switch (figure.type) {
            case ToolTypes.brush: Brush.draw(canvasState.ctx, coordinates);
                break;
            case ToolTypes.rectangle: {
                const { sizes } = figure;
                Rectangle.draw(canvasState.ctx, coordinates, sizes);
            }
                break;
            case ToolTypes.finish: canvasState.ctx.beginPath();
                break;
            default: break;
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
