import { FC, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import cls from './Canvas.module.scss';
import canvasState from '../model/state/canvasState';

interface CanvasProps {
}

export const Canvas: FC<CanvasProps> = observer(() => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            canvasState.setCanvas(canvas);
        }
    }, []);

    return (
        <div className={cls.Canvas}>
            <canvas width={1000} height={700} ref={canvasRef} />
        </div>
    );
});
