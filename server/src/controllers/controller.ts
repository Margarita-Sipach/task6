import { getImgPath } from '..'
import { distribution } from '../lib/distribution'
import { type ConnectMsg, type DrawMsg } from '../type/message'
import { Methods } from '../type/methods'
import fs from 'fs'

const ENCODING = 'base64'

class Controller {
    ids = new Set<string>()

    sendIds () {
        distribution.allClients({ method: Methods.getIds, ids: [...this.ids] })
    }

    connect (ws: any, msg: ConnectMsg) {
        ws.id = msg.id
        distribution.client(msg)
        if (!this.ids.has(msg.id)) {
            this.ids.add(msg.id)
            this.sendIds()
        } else {
            this.sendImg(msg.id)
        }
    }

    setImg (msg: DrawMsg) {
        const data = msg.img
        fs.writeFileSync(getImgPath(msg.id), data, ENCODING)
    }

    sendImg (id: string) {
        const img = fs.readFileSync(getImgPath(id)).toString(ENCODING)
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
