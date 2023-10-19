import { distribution } from '../lib/distribution'
import { image } from '../lib/image'
import { type ConnectMsg, type DrawMsg } from '../type/message'
import { Methods } from '../type/methods'

class Controller {
    ids = image.getBoardsIds()

    connect (ws: any, {method, id, img}: ConnectMsg) {
        ws.id = id
        if (!this.ids.includes(id)) {
            this.ids.push(id)
            image.setImg(id, img)
        }
        distribution.client({
			method,
			id: id,
			img: image.getImg(id)
		})
        this.sendBoards()
    }

    sendBoards () {
        const boards = image.getBoards()
        distribution.allClients({ method: Methods.sendBoards, boards })
    }

    sendBoard (id: string) {
        distribution.client({
            method: Methods.sendBoard,
            id,
            img: image.getImg(id)
        })
    }

    setImg (msg: DrawMsg) {
        image.setImg(msg.id, msg.img)
    }

    draw (msg: DrawMsg) {
        distribution.client(msg)
        if (msg.img) {
            this.setImg(msg)
            this.sendBoard(msg.id)
        }
    }
}

export const controller = new Controller()
