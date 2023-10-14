import { ChangeEvent, FC } from 'react';
import cls from "./Settingbar.module.scss";
import { toolState } from 'entities/Tool';

interface SettingbarProps {
}

export const Settingbar: FC<SettingbarProps> = () => <div className={`bar ${cls.Settingbar}`}>
	<div>
		<input type="number" min={1} max={50} onChange={(e: ChangeEvent<HTMLInputElement>) => toolState.setWidth(+e.target.value)} />
		<input type="color" onChange={(e: ChangeEvent<HTMLInputElement>) => toolState.setColor(e.target.value)} />
	</div>
</div>;
