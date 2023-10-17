import { ChangeEvent, FC } from 'react';
import { PaintTool, toolState } from 'entities/Tool';
import cls from './Settingbar.module.scss';

interface SettingbarProps {
}

export const Settingbar: FC<SettingbarProps> = () => {
    const setToolProperty = (
        e: ChangeEvent<HTMLInputElement>,
        setter: 'lineWidth' | 'color',
    ) => {
        PaintTool[setter] = e.target.value as any;
    };

    return (
        <div className={`bar ${cls.Settingbar}`}>
            <div>
                <input
                    type="number"
                    min={1}
                    max={50}
                    onChange={(e) => setToolProperty(e, 'lineWidth')}
                />
                <input
                    type="color"
                    onChange={(e) => setToolProperty(e, 'color')}
                />
            </div>
        </div>
    );
};
