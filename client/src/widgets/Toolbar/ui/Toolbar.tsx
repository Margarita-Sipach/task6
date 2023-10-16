import { FC } from 'react';
import {
    Brush, PaintTool, Rectangle, toolState,
} from 'entities/Tool';
import { canvasState } from 'widgets/Canvas';
import cls from './Toolbar.module.scss';

interface ToolbarProps {
}

export const Toolbar: FC<ToolbarProps> = () => {
    const setTool = (NewTool: typeof PaintTool) => {
        if (canvasState.canvas) {
            toolState.setTool(new NewTool(
                canvasState.canvas,
                canvasState.ws,
                canvasState.sessionId,
            ));
        }
    };

    return (
        <div className={`bar ${cls.Toolbar}`}>
            <button
                type="button"
                onClick={() => setTool(Brush)}
            >
                Brash
            </button>
            <button
                type="button"
                onClick={() => setTool(Rectangle)}
            >
                Rectangle
            </button>
        </div>
    );
};
