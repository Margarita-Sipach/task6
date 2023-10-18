import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Link } from 'react-router-dom';
import { DATA_IMG_STR } from 'shared/const/image';
import { canvasState } from 'widgets/Canvas';
import { observer } from 'mobx-react-lite';
import cls from './Boards.module.scss';

export const Boards = observer(() => (
    <div className={cls.boards}>
        {Object.entries(canvasState.boards || {}).map(([id, img]) => (
            <Link
                key={id}
                to={`${RoutePath.paint}/${id}`}
                className={cls.board}
            >
                <img src={DATA_IMG_STR + img} alt={`board ${id}`} />
                <span className={cls.title}>{id}</span>
            </Link>
        ))}
    </div>
));
