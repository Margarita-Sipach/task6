import { distribution } from '../lib/distribution'
import { image } from '../lib/image'
import { type ConnectMsg, type DrawMsg } from '../type/message'
import { Methods } from '../type/methods'

class Controller {
    ids = image.getBoardsIds()

    sendBoards () {
        const boards = image.getBoards()
        distribution.allClients({ method: Methods.getBoards, boards })
    }

    connect (ws: any, msg: ConnectMsg) {
        ws.id = msg.id
        distribution.client(msg)
        if (!this.ids.includes(msg.id)) {
            this.ids.push(msg.id)
            this.sendBoards()
            image.setImg(msg.id, '')
        } else {
            this.sendImg(msg.id)
        }
    }

    setImg (msg: DrawMsg) {
        image.setImg(msg.id, msg.img)
    }

    sendImg (id: string) {
        const img = image.getImg(id)
        distribution.client({
            method: Methods.setImg,
            id,
            img
        })
    }

    draw (msg: DrawMsg) {
        distribution.client(msg)
        if (msg.img) {
            this.setImg(msg)
            this.sendImg(msg.id)
        }
    }
}

export const controller = new Controller()
