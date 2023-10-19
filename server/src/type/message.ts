import { type Methods } from './methods'

interface MsgParent {
    id: string
    method: Methods
}

export interface ConnectMsg extends MsgParent {
    method: Methods.connect
    img: string
}

export interface DrawMsg extends MsgParent {
    method: Methods.draw
    img: string
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

export interface SendBoardsMsg {
    method: Methods.sendBoards
    boards: Record<string, string>
}

export interface SendBoardMsg extends MsgParent {
    method: Methods.sendBoard
    img: string
}

export type Msg = DrawMsg | ConnectMsg | SendBoardsMsg | SendBoardMsg
