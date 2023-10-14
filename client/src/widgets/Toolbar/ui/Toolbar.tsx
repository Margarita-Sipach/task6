import { FC } from 'react';
import cls from "./Toolbar.module.scss";
import { toolState } from 'entities/Tool';
import { Brush } from 'entities/Tool/lib/Brush';
import canvasState from 'widgets/Canvas/model/state/canvasState';
import { Rectangle } from 'entities/Tool/lib/Rectangle';

interface ToolbarProps {
}

export const Toolbar: FC<ToolbarProps> = () => <div className={`bar ${cls.Toolbar}`}>
	<button onClick={() => canvasState.canvas && toolState.setTool(new Brush(canvasState.canvas))}>Brash</button>
	<button onClick={() => canvasState.canvas && toolState.setTool(new Rectangle(canvasState.canvas))}>Rectangle</button>
</div>;
