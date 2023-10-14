import { FC } from 'react';
import cls from "./Settingbar.module.scss";

interface SettingbarProps {
}

export const Settingbar: FC<SettingbarProps> = () => <div className={`bar ${cls.Settingbar}`}>reload page</div>;
