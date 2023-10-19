import { observer } from 'mobx-react-lite';
import { canvasState } from 'widgets/Canvas';
import cls from './Screen.module.scss';

export const Screen = observer(() => (
    <img
        className={cls.screen}
        src={canvasState.url}
        alt="mini board"
    />
));
