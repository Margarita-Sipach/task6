import { Brush } from './Brush';

const ERASER_COLOR = '#fff';

export class Eraser extends Brush {
    constructor() {
        super();
        this.color = ERASER_COLOR;
		this.ctx.globalCompositeOperation = 'destination-out'
    }
}
