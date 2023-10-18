import path from 'path'
import fs from 'fs'

const FOLDER_NAME = 'images'
const ENCODING = 'base64'
const IMG_EXTENSION = '.jpg'

class Image {
    folderPath = path.resolve(__dirname, '..', FOLDER_NAME)

    getBoards () {
        return fs.readdirSync(this.folderPath)
            .reduce((boards, name) => {
                const id = this.removeExtension(name)
                const imgPath = path.resolve(this.folderPath, name)
                const img = fs.readFileSync(imgPath).toString(ENCODING)
                return ({
                    ...boards,
                    [id]: img
                })
            }, {})
    }

    getImgPathById (id: string) {
        return path.resolve(this.folderPath, this.addExtension(id))
    }

    removeExtension (id: string) {
        return id.replace(IMG_EXTENSION, '')
    }

    addExtension (id: string) {
        return `${id}${IMG_EXTENSION}`
    }

    getImg (id: string) {
        const imgPath = image.getImgPathById(id)
        return fs.readFileSync(imgPath).toString(ENCODING)
    }

    setImg (id: string, data: string) {
        const imgPath = image.getImgPathById(id)
        fs.writeFileSync(imgPath, data, ENCODING)
    }

    getBoardsIds () {
        return fs.readdirSync(this.folderPath)
            .map((name) => this.removeExtension(name))
    }
}

export const image = new Image()
