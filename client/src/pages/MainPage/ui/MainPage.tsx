import { useEffect, useState } from 'react';
import { Methods } from 'shared/ws/ws';
import { canvasState } from 'widgets/Canvas';
import cls from './MainPage.module.scss';
import { Boards } from './Boards/Boards';
import { AddForm } from './AddForm/AddForm';

const MainPage = () => {
    useEffect(() => {
        const ws = new WebSocket(__WS__);
        ws.onopen = () => {
            ws.send(JSON.stringify({ method: Methods.getBoards }));
            ws.onmessage = (msg) => {
                console.log(msg);
                const { method, ...params } = JSON.parse(msg.data);
                if (method === Methods.getBoards) {
                    canvasState.setBoards(params.boards);
                }
            };
        };
    }, []);

    return (
        <div className={`page-wrapper ${cls.MainPage}`}>
            <AddForm />
            <Boards />
        </div>
    );
};

export default MainPage;
