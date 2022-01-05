import * as proto_player_pb from "../../proto/player_pb";

import * as puppeteer from 'puppeteer'



class PlayerServiceClass {
    static serviceClassInstance:PlayerServiceClass;
    static browser:any;
    static page: any;
    static box: any;
    constructor() {}


    static getInstance = ():PlayerServiceClass => {
        if(PlayerServiceClass.serviceClassInstance === null) {
            PlayerServiceClass.serviceClassInstance = new PlayerServiceClass();
        }
        return PlayerServiceClass.serviceClassInstance
    }

    async init() {
        PlayerServiceClass.browser = await puppeteer.launch({headless: false, slowMo: 0})
        PlayerServiceClass.page = await PlayerServiceClass.browser.newPage()
        await PlayerServiceClass.page.setViewport({width: 1440, height: 800})
        await PlayerServiceClass.page.goto('http://localhost:3000')

        const visualArea = await PlayerServiceClass.page.$('.anim')
        if (visualArea) {
            PlayerServiceClass.box = await visualArea.boundingPlayerServiceClass.box()
        }
    }

     async mouseUp() {
        await PlayerServiceClass.page.mouse.up()
    }

    async mouseDown(intensity:number) {
        await PlayerServiceClass.page.mouse.move(
            Math.floor(Math.random() * (1920 - PlayerServiceClass.box.x) + PlayerServiceClass.box.x) + Math.floor(Math.random() * (intensity - 2) + 2),
            Math.floor(Math.random() * (1920 - PlayerServiceClass.box.x) + PlayerServiceClass.box.x) + Math.floor(Math.random() * (300 - 2) + 2),
        )
    }

    pointBit(clientMessage:proto_player_pb.ClientMessage, serverMessage:proto_player_pb.ServerMessage) {
        const response = new proto_player_pb.ServerMessage()
        const intensity = 2000 / (1 - (parseFloat(clientMessage.getA()) + parseFloat(clientMessage.getB()) + parseFloat(clientMessage.getC()) + parseFloat(clientMessage.getD() )))
        if (intensity > 34) {
            PlayerServiceClass.page.mouse.down()
            for (let i = 0; i < Math.floor(intensity / 4); i++) {
                this.mouseDown(intensity)
            }
            this.mouseUp()
        }

        return response
    }
}


export const playerService = PlayerServiceClass.getInstance().init()



// new Promise(async (resolve, reject) => {
//   const player = new Pupetierplayer()
//   await player.init()
// })
//   .then((r) => console.log('r -> ', r))
//   .catch((e) => console.log('e -> ', e))
