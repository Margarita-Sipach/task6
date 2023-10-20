import { Canvas } from 'widgets/Canvas';
import { Settingbar } from 'widgets/Settingbar';
import { Toolbar } from 'widgets/Toolbar';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import cls from './PaintPage.module.scss';
import { Screen } from './Screen/Screen';

const PaintPage = () => {
    const { id } = useParams();
    const [isScreenVisible, setIsScreenVisible] = useState(true);

    return (
        <div className={`page-wrapper ${cls.PaintPage}`}>
            <div>
                {isScreenVisible && <Screen />}

                <Toolbar onScreenBtnClick={() => setIsScreenVisible((prev) => !prev)} />
                <Settingbar />
            </div>
            {id && <Canvas id={id} />}
        </div>
    );
};

export default PaintPage;
