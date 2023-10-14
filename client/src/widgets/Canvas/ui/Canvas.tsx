import { FC, useEffect, useRef } from 'react';
import cls from "./Canvas.module.scss";

interface CanvasProps {
}

export const Canvas: FC<CanvasProps> = () => {
	const canvasRef = useRef(null)
	
	return <div  className={cls.Canvas}>
		<canvas width={1000} height={700} ref={canvasRef}/>
	</div>
};
