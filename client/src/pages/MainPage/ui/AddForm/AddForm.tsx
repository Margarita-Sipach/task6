import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Link, generatePath, useNavigate } from 'react-router-dom';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { Input } from 'shared/ui/Input';
import { useState } from 'react';
import { canvasState } from 'widgets/Canvas';
import cls from './AddForm.module.scss';

const WRONG_BOARD_NAME = 'Board name is not unique or empty';

export const AddForm = () => {
    const navigate = useNavigate();
    const [currentId, setCurrentId] = useState('');

    const addBoard = () => {
        const isIdUniq = Object.keys(canvasState.boards).includes(currentId);
        if (!currentId.length || isIdUniq) return alert(WRONG_BOARD_NAME);
        const path = generatePath(`${RoutePath.paint}/:id`, { id: currentId });
        return navigate(path);
    };

    return (
        <form className={cls.form}>
            <Input
                placeholder="Board name"
                value={currentId}
                onChange={setCurrentId}
            />
            <Button
                theme={ButtonTheme.outlined}
                onClick={addBoard}
            >
                New
            </Button>

        </form>
    );
};
