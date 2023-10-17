import { useEffect, useState } from 'react';
import { Link, generatePath, useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { Input } from 'shared/ui/Input/Input';
import { Methods } from 'shared/ws/ws';
import cls from './MainPage.module.scss';

const MainPage = () => {
    const [currentId, setCurrentId] = useState('');
    const [currentIds, setCurrentIds] = useState<string[]>([]);

    const navigate = useNavigate();

    const addBoard = () => {
        const isIdUniq = currentIds.includes(currentId);
        if (!currentId.length || isIdUniq) return alert('Wrong board name');
        const path = generatePath(`${RoutePath.paint}/:id`, { id: currentId });
        return navigate(path);
    };

    useEffect(() => {
        const ws = new WebSocket(__API__.replace('http', 'ws'));
        ws.onopen = () => {
            ws.send(JSON.stringify({ method: Methods.getIds }));
            ws.onmessage = (msg) => {
                const { method, ids } = JSON.parse(msg.data);
                if (method === Methods.getIds) {
                    setCurrentIds(ids);
                }
            };
        };
    }, []);

    return (
        <div className={`page-wrapper ${cls.MainPage}`}>
            <Button theme={ButtonTheme.outlined} onClick={addBoard}>New</Button>
            <Input value={currentId} onChange={setCurrentId} />
            <div>
                {currentIds.map((id) => (
                    <Link
                        key={id}
                        to={`${RoutePath.paint}/${id}`}
                    >
                        {id}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default MainPage;
