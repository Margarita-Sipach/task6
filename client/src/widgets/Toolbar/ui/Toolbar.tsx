import { FC, useEffect } from 'react';
import {
    Brush, PaintTool, Rectangle, toolState,
} from 'entities/Tool';
import { canvasState } from 'widgets/Canvas';
import { Button } from 'shared/ui/Button';
import { BsFillBrushFill } from 'react-icons/bs';
import { BiSolidRectangle } from 'react-icons/bi';
import cls from './Toolbar.module.scss';

interface ToolbarProps {
}

export const Toolbar: FC<ToolbarProps> = () => {
    const setTool = (NewTool: typeof PaintTool) => {
        if (canvasState.canvas) {
            toolState.setTool(new NewTool());
        }
    };

    useEffect(() => {
        setTool(Brush);
    }, []);

    return (
        <div className={`bar ${cls.Toolbar}`}>
            <div className={cls.paint}>
                <Button
                    onClick={() => setTool(Brush)}
                >
                    <BsFillBrushFill />
                </Button>
                <Button
                    onClick={() => setTool(Rectangle)}
                >
                    <BiSolidRectangle />
                </Button>
            </div>

        </div>
    );
};
