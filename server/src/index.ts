import express, { Request, Response } from 'express'
import expressWs from 'express-ws'

import cors from 'cors'

const appBase = express()
const wsInstance = expressWs(appBase)
const aWss = wsInstance.getWss()
const { app } = wsInstance

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT ?? 8000

const ids = new Set<string>()

interface AppWebSocket extends WebSocket {
  id: string
}

interface MsgParent {
  id: string
}

interface ConnectMsg extends MsgParent {
  method: Methods.connect
}

interface DrawMsg extends MsgParent {
  method: Methods.draw
  figure: {
    type: string
    coordinates?: {
      x: number
      y: number
    }
    sizes?: {
      width: number
      height: number
    }
  }
}

interface GetIdsMsg {
  method: Methods.getIds
  ids: string[]
}

type Msg = DrawMsg | ConnectMsg | GetIdsMsg

enum Methods {
  connect = 'connect',
  draw = 'draw',
  getIds = 'getIds'
}

const sendIds = () => {
  broadcastConnectAll({ method: Methods.getIds, ids: [...ids] })
}

const connect = (ws: any, msg: ConnectMsg) => {
  ws.id = msg.id
  ids.add(msg.id)
  broadcastConnect(msg)
  sendIds()
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

const draw = (msg: DrawMsg) => {
  broadcastConnect(msg)
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
