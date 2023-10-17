import { aWss } from '..'
import { type Msg } from '../type/message'

export const distribution = {
    allClients: (msg: Msg) => {
        aWss.clients.forEach((client: any) => {
            client.send(JSON.stringify(msg))
        })
    },
    client: (msg: Msg, id = msg.id) => {
        aWss.clients.forEach((client: any) => {
            if (client.id === id) client.send(JSON.stringify(msg))
        })
    }
}
