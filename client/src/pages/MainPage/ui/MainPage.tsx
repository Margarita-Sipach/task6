import { useState } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { Input } from 'shared/ui/Input/Input';
import cls from './MainPage.module.scss';

const MainPage = () => {
    const [id, setId] = useState('');

    const navigate = useNavigate();

    const addBoard = () => {
        const path = generatePath(RoutePath.paint, { id });
        navigate(path);
    };

    return (
        <div className={`page-wrapper ${cls.MainPage}`}>
            <Button theme={ButtonTheme.outlined} onClick={addBoard}>New</Button>
            <Input value={id} onChange={setId} />
            <div />
        </div>
    );
};

export default MainPage;
