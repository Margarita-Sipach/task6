import { FC, useEffect } from 'react';
import {
    Brush, PaintTool, Rectangle, toolState,
} from 'entities/Tool';
import { canvasState } from 'widgets/Canvas';
import { Button } from 'shared/ui/Button';
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

    useEffect(() => {
        setTool(Brush);
    }, []);

    return (
        <div className={`bar ${cls.Toolbar}`}>
            <Button
                onClick={() => setTool(Brush)}
            >
                Brush
            </Button>
            <Button
                onClick={() => setTool(Rectangle)}
            >
                Rectangle
            </Button>
        </div>
    );
};
