import { distribution } from '../lib/distribution'
import { image } from '../lib/image'
import { type ConnectMsg, type DrawMsg } from '../type/message'
import { Methods } from '../type/methods'

class Controller {
    ids = image.getBoardsIds()

    connect (ws: any, msg: ConnectMsg) {
        ws.id = msg.id
        if (!this.ids.includes(msg.id)) {
            this.ids.push(msg.id)
            image.setImg(msg.id, msg.img)
        }
        distribution.client(msg)
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
