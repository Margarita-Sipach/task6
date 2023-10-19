import express from 'express'
import expressWs from 'express-ws'
import cors from 'cors'
import { Methods } from './type/methods'
import { type Msg } from './type/message'
import { controller } from './controllers/controller'
import path from 'path'
import fs from 'fs'

const appBase = express()
const wsInstance = expressWs(appBase)
export const aWss = wsInstance.getWss()
const { app } = wsInstance
const ENCODING = 'base64'

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT ?? 8000

app.ws('/', (ws, req) => {
    ws.on('message', (message: string) => {
        const msg: Msg = JSON.parse(message)

        switch (msg.method) {
            case Methods.connect: controller.connect(ws, msg)
                break
            case Methods.draw: controller.draw(msg)
                break
            case Methods.sendBoards: controller.sendBoards()
                break
            default:
                break
        }
    })
})

app.listen(PORT, () => { console.log(`Server start, port: ${PORT}`) })
