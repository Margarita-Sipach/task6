import { FC } from 'react';
import { toolState } from 'entities/Tool';
import { Brush } from 'entities/Tool/lib/Brush';
import { Tool } from 'entities/Tool/lib/ParentTool';
import { canvasState } from 'widgets/Canvas';
import { Rectangle } from 'entities/Tool/lib/Rectangle';
import cls from './Toolbar.module.scss';

interface ToolbarProps {
}

export const Toolbar: FC<ToolbarProps> = () => {
    const setTool = (NewTool: typeof Tool) => {
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
