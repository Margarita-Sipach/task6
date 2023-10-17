import express, { Request, Response } from 'express'
import expressWs from 'express-ws'
import fs from 'fs'
import path from 'path'

import cors from 'cors'
import { Methods } from './type/methods'
import { type ConnectMsg, type DrawMsg, type GetIdsMsg, type Msg } from './type/message'

const appBase = express()
const wsInstance = expressWs(appBase)
const aWss = wsInstance.getWss()
const { app } = wsInstance

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT ?? 8000

const ids = new Set<string>()

const sendIds = () => {
    broadcastConnectAll({ method: Methods.getIds, ids: [...ids] })
}

const connect = (ws: any, msg: ConnectMsg) => {
    ws.id = msg.id
    ids.add(msg.id)
    broadcastConnect(msg)
    sendIds()
    sendImg(msg.id)
    return msg.id
}

const broadcastConnect = (msg: Exclude<Msg, GetIdsMsg>) => {
    aWss.clients.forEach((client: any) => {
        if (client.id === msg.id) client.send(JSON.stringify(msg))
    })
}

const broadcastConnectAll = (msg: Msg) => {
    aWss.clients.forEach((client: any) => {
        client.send(JSON.stringify(msg))
    })
}

const setImg = (msg: DrawMsg) => {
    const data = msg.img
    fs.writeFileSync(path.resolve(__dirname, 'images', `${msg.id}.jpg`), data, 'base64')
}

const sendImg = (id: string) => {
    const img = 'data:image/png;base64,' + fs.readFileSync(path.resolve(__dirname, 'images', `${id}.jpg`)).toString('base64')
    broadcastConnect({
        method: Methods.setImg,
        id,
        img
    })
}

const draw = (msg: DrawMsg) => {
    broadcastConnect(msg)
    if (msg.img) {
        setImg(msg)
        sendImg(msg.id)
    }
}

app.ws('/', (ws, req) => {
    ws.on('message', (message: string) => {
        const msg: Msg = JSON.parse(message)

        switch (msg.method) {
            case Methods.connect: connect(ws, msg)
                break
            case Methods.draw: draw(msg)
                break
            case Methods.getIds: sendIds()
                break
            default:
                break
        }
    })
})

app.listen(PORT, () => { console.log(`Server start, port: ${PORT}`) })
