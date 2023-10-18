import { type Methods } from './methods'

interface MsgParent {
    id: string
    method: Methods
}

export interface ConnectMsg extends MsgParent {
    method: Methods.connect
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

export interface GetBoardsMsg {
    method: Methods.getBoards
    boards: Record<string, string>
}

export interface SetImgMsg extends MsgParent {
    method: Methods.setImg
    img: string
}

export type Msg = DrawMsg | ConnectMsg | GetBoardsMsg | SetImgMsg
