import { FC } from 'react';
import cls from "./Toolbar.module.scss";

interface ToolbarProps {
}

export const Toolbar: FC<ToolbarProps> = () => <div className={`bar ${cls.Toolbar}`}>
	<button>Brash</button>
</div>;
