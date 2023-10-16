import express from 'express'
import expressWs from 'express-ws'

const appBase = express()
const wsInstance = expressWs(appBase)
const aWss = wsInstance.getWss()
const { app } = wsInstance

const PORT = process.env.PORT ?? 8000

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

type Msg = DrawMsg | ConnectMsg

enum Methods {
  connect = 'connect',
  draw = 'draw',
}

const connect = (ws: any, msg: ConnectMsg) => {
  ws.id = msg.id
  broadcastConnect(msg)
}

const broadcastConnect = (msg: Msg) => {
  aWss.clients.forEach((client: any) => {
    if (client.id === msg.id) client.send(JSON.stringify(msg))
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
      default:
        break
    }
  })
})

app.listen(PORT, () => { console.log(`Server start, port: ${PORT}`) })
