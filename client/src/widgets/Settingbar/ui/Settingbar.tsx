import { ChangeEvent, FC } from 'react';
import { toolState } from 'entities/Tool';
import cls from './Settingbar.module.scss';

interface SettingbarProps {
}

export const Settingbar: FC<SettingbarProps> = () => {
    const setToolProperty = (
        e: ChangeEvent<HTMLInputElement>,
        setter: 'setWidth' | 'setColor',
    ) => {
        toolState[setter](e.target.value);
    };

    return (
        <div className={`bar ${cls.Settingbar}`}>
            <div>
                <input
                    type="number"
                    min={1}
                    max={50}
                    onChange={(e) => setToolProperty(e, 'setWidth')}
                />
                <input
                    type="color"
                    onChange={(e) => setToolProperty(e, 'setColor')}
                />
            </div>
        </div>
    );
};
