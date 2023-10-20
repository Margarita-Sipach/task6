import { FC, useEffect } from 'react';
import {
    Brush, PaintTool, Rectangle, toolState,
} from 'entities/Tool';
import { canvasState } from 'widgets/Canvas';
import { Button } from 'shared/ui/Button';
import { BsFillBrushFill, BsFillEraserFill } from 'react-icons/bs';
import { BiSolidRectangle } from 'react-icons/bi';
import { AiFillSave, AiOutlineFundProjectionScreen } from 'react-icons/ai';
import { Eraser } from 'entities/Tool/lib/Eraser';
import cls from './Toolbar.module.scss';

interface ToolbarProps {
	onScreenBtnClick: () => void
}

export const Toolbar: FC<ToolbarProps> = ({ onScreenBtnClick }) => {
    const setTool = (NewTool: typeof PaintTool) => {
        if (canvasState.canvas) {
            toolState.setTool(new NewTool());
        }
    };

    useEffect(() => {
        setTool(Brush);
    }, []);

    const save = () => {
        const IMG_EXTENSION = '.jpg';
        const { url } = canvasState;
        const a = document.createElement('a');
        a.href = url;
        a.download = canvasState.sessionId + IMG_EXTENSION;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <div className={`bar ${cls.Toolbar}`}>
            <div className={cls.paint}>
                <Button
                    onClick={() => setTool(Brush)}
                >
                    <BsFillBrushFill />
                </Button>
                <Button
                    onClick={() => setTool(Eraser)}
                >
                    <BsFillEraserFill />
                </Button>
                <Button
                    onClick={() => setTool(Rectangle)}
                >
                    <BiSolidRectangle />
                </Button>
            </div>
            <div>
                <Button
                    onClick={save}
                >
                    <AiFillSave />
                </Button>
                <Button
                    onClick={onScreenBtnClick}
                >
                    <AiOutlineFundProjectionScreen />
                </Button>
            </div>
        </div>
    );
};
