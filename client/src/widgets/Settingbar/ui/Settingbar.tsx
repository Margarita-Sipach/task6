import { ChangeEvent, FC } from 'react';
import { PaintTool, toolState } from 'entities/Tool';
import { Input } from 'shared/ui/Input';
import { Color } from 'shared/ws/ws';
import cls from './Settingbar.module.scss';

interface SettingbarProps {
}

export const Settingbar: FC<SettingbarProps> = () => (
    <div className={`bar ${cls.Settingbar}`}>

        <Input
            type="number"
            min={1}
            max={50}
            onChange={(val) => toolState.setLineWidth(+val)}
            placeholder="Line Weight"
        />
        <Input
            type="color"
            className={cls.color}
            onChange={(val) => toolState.setColor(val)}
        />
    </div>
);
