import { useEffect } from 'react';
import { Methods } from 'shared/ws/ws';
import { canvasState } from 'widgets/Canvas';
import { observer } from 'mobx-react-lite';
import cls from './MainPage.module.scss';
import { Boards } from './Boards/Boards';
import { AddForm } from './AddForm/AddForm';

const MainPage = observer(() => {
    const msgHandler = (msg: { data: string; }) => {
        const { method, ...params } = JSON.parse(msg.data);
        if (method === Methods.sendBoards) {
            canvasState.setBoards(params.boards);
        }
    };

    useEffect(() => {
        const ws = new WebSocket(__WS__);
        ws.onopen = () => {
            ws.send(JSON.stringify({ method: Methods.sendBoards }));
            ws.onmessage = msgHandler;
        };
    }, []);

    return (
        <div className={`page-wrapper ${cls.MainPage}`}>
            <AddForm />
            <Boards />
        </div>
    );
});

export default MainPage;
