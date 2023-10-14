import { Canvas } from "widgets/Canvas";
import { Settingbar } from "widgets/Settingbar";
import { Toolbar } from "widgets/Toolbar";
import cls from "./MainPage.module.scss"

const MainPage = () => <div className={`page-wrapper ${cls.MainPage}`}>
	<Toolbar></Toolbar>
	<Settingbar></Settingbar>
	<Canvas></Canvas>
</div>;

export default MainPage;
