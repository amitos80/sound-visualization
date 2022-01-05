import { sum, take } from 'lodash'
import puppeteer from 'puppeteer'
import * as proto_chat_pb from './proto/chat_pb'

const randomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min) + min)

type Point = { x: number; y: number }

export class PlayerService {
  //public static serviceClassInstance: PlayerService;
  private static serviceClassInstance: PlayerService
  public browser: any
  public page: any
  public box: any
  public ready: boolean | undefined

  static getInstance = (): PlayerService => {
    if (!PlayerService.serviceClassInstance) {
      PlayerService.serviceClassInstance = new PlayerService()
    }
    return PlayerService.serviceClassInstance
  }

  async init() {
    PlayerService.getInstance().browser = await puppeteer.launch({
      headless: false,
      slowMo: 0,
    })
    PlayerService.getInstance().page =
      await PlayerService.getInstance().browser.newPage()
    await PlayerService.getInstance().page.setViewport({
      width: 1920,
      height: 1080,
    })
    await PlayerService.getInstance().page.goto('http://localhost:3000')

    const visualArea = await PlayerService.getInstance().page.$('.anim')
    if (visualArea) {
      PlayerService.getInstance().box = await visualArea.boundingBox()
    }
    PlayerService.getInstance().ready = true
  }

  ensureCords({ x, y }: Point): Point {
    return { x: Math.max(0, 1000), y: Math.max(0, 800) } as Point
  }

  async mouseUp() {
    await PlayerService.getInstance().page.mouse.up()
  }

  async mouseMove(intensity: number) {
    const x =
      Math.floor(
        Math.random() * (500 - PlayerService.getInstance().box.x) +
          PlayerService.getInstance().box.x
      ) + Math.floor(Math.random() * (intensity - 2) + 2)
    const y =
      Math.floor(
        Math.random() * (500 - PlayerService.getInstance().box.x) +
          PlayerService.getInstance().box.x
      ) + Math.floor(Math.random() * (300 - 2) + 2)
    //console.log('x ', x, ' y ', y, intensity);
    const a = Math.min(x, 999)
    const b = Math.max(y, 799)
    await PlayerService.getInstance().page.mouse.move(a, b)
  }

  async pointBit(
    clientMessage: any,
    serverMessage: proto_chat_pb.ServerMessage
  ) {
    if (!PlayerService.getInstance().page) return
    // console.log('pointBit YES Page clientMessage -> ', clientMessage);
    const response = new proto_chat_pb.ServerMessage()
    const sample =
      clientMessage.array?.length &&
      clientMessage.array[1]?.split(',').filter((n: any) => !isNaN(Number(n)))
    // console.log('sample ', sample?.length, ' sample ', sample);
    if (!sample?.length) return response
    const blockSize = Math.floor(sample?.length / 4)
    // console.log('blockSize ', blockSize);
    const a1 = take(sample, blockSize)
    sample.splice(0, blockSize)
    const a2 = take(sample, blockSize)
    sample.splice(0, blockSize)
    const a3 = take(sample, blockSize)
    sample.splice(0, blockSize)
    const a4 = take(sample, blockSize - 1)

    const a = sum(a1.map((i) => Number(i))) / a1.length // bass / gain
    const b = sum(a2.map((i) => Number(i))) / a2.length // bass / gain
    const c = sum(a3.map((i) => Number(i))) / a3.length // bass / gain
    const d = sum(a4.map((i) => Number(i))) / a4.length // bass / gain
    //const intensity = Math.min(3, -17 * (500 / (1 - (a + b + c + d))));
    const intensity = a + b + c + (d / 300) * 5
    console.log('intensity ', Math.floor(intensity))
    // await PlayerService.getInstance().page.mouse.move(
    //   Math.floor(PlayerService.getInstance().box.width / 2),
    //   Math.floor(PlayerService.getInstance().box.height / 2),
    //   { steps: randomNumber(1, 768 / intensity) }
    // )
    await PlayerService.getInstance().page.mouse.down()
    // for (let i = 0; intensity > 207 && i < Math.floor(intensity / 190); i++) {
    // await PlayerService.getInstance().page.mouse.down();
    //await this.mouseMove(intensity);

    await PlayerService.getInstance().page.mouse.move(
      (randomNumber(0, intensity) % 3 === 0 ? -1 : 1) *
        Math.floor(
          PlayerService.getInstance().box.width / 2 +
            randomNumber(0, intensity * 0.05)
        ),
      Math.floor(
        (randomNumber(0, intensity) % 3 === 0 ? -1 : 1) *
          (PlayerService.getInstance().box.height / 2) +
          randomNumber(0, intensity * 0.05)
      ),
      {
        steps:
          intensity > 242
            ? randomNumber(1, 768 / intensity)
            : randomNumber(1, 420 / intensity),
      }
    )
    // }
    await PlayerService.getInstance().page.mouse.up()

    return response
  }
}

// new Promise(async (resolve, reject) => {
//   const player = new Pupetierplayer()
//   await player.init()
// })
//   .then((r) => console.log('r -> ', r))
//   .catch((e) => console.log('e -> ', e))
