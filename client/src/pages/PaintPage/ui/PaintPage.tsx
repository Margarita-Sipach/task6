import { Canvas } from 'widgets/Canvas';
import { Settingbar } from 'widgets/Settingbar';
import { Toolbar } from 'widgets/Toolbar';
import { useParams } from 'react-router-dom';
import cls from './PaintPage.module.scss';
import { Screen } from './Screen/Screen';

const PaintPage = () => {
    const { id } = useParams();

    return (
        <div className={`page-wrapper ${cls.PaintPage}`}>
            <Screen />
            <Toolbar />
            <Settingbar />
            {id && <Canvas id={id} />}
        </div>
    );
};

export default PaintPage;
