import { aWss } from '..'
import { SetImgMsg, type Msg, type GetBoardsMsg } from '../type/message'

export const distribution = {
    allClients: (msg: Msg) => {
        aWss.clients.forEach((client: any) => {
            client.send(JSON.stringify(msg))
        })
    },
    client: (msg: Exclude<Msg, GetBoardsMsg>, id = msg.id) => {
        aWss.clients.forEach((client: any) => {
            if (client.id === id) client.send(JSON.stringify(msg))
        })
    }
}
