import { Canvas } from 'widgets/Canvas';
import { Settingbar } from 'widgets/Settingbar';
import { Toolbar } from 'widgets/Toolbar';
import { useParams } from 'react-router-dom';
import cls from './PaintPage.module.scss';

const PaintPage = () => {
    const { id } = useParams();

    return (
        <div className={`page-wrapper ${cls.PaintPage}`}>
            <Toolbar />
            <Settingbar />
            {id && <Canvas id={id} />}
        </div>
    );
};

export default PaintPage;
