import { sum, take } from 'lodash'
// @ts-ignore
import puppeteer from 'puppeteer'
import * as proto_chat_pb from './proto/chat_pb'

const VIEW_WIDTH = 2440
const VIEW_HEIGHT = 1180

const randomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min) + min)

type Point = { x: number; y: number }

export class PlayerService {
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
      width: VIEW_WIDTH,
      height: VIEW_HEIGHT,
    })
    await PlayerService.getInstance().page.goto('http://localhost:3000')

    const visualArea = await PlayerService.getInstance().page.$('.anim')
    if (visualArea) {
      PlayerService.getInstance().box = await visualArea.boundingBox()
    }
    PlayerService.getInstance().ready = true
  }

  randSign(intensity: number) {
    return randomNumber(0, intensity) % 2 === 0 ? -1 : 1
  }

  ensureCords({ x, y }: Point): Point {
    return { x: Math.max(0, VIEW_WIDTH), y: Math.max(0, VIEW_HEIGHT) } as Point
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

    const a = sum(a1.map((i) => Number(i))) / a1.length
    const b = sum(a2.map((i) => Number(i))) / a2.length
    const c = sum(a3.map((i) => Number(i) + 11)) / a3.length
    const d = sum(a4.map((i) => Number(i) + 37)) / a4.length
    const intensity = Math.floor(a + b + c + d)
    if ((a < 70 && b < 70 && c < 54 && d < 63) || intensity < 172) {
      return response
    }
    console.log('intensity ', intensity)
    console.log('a ', a)
    console.log('b ', b)
    console.log('c ', c)
    console.log('d ', d)
    await PlayerService.getInstance().page.mouse.down()
    await PlayerService.getInstance().page.mouse.move(
      this.randSign(intensity) *
        Math.floor(
          PlayerService.getInstance().box.width / 2 +
            randomNumber(11, intensity)
        ),
      Math.floor(
        this.randSign(intensity) *
          (PlayerService.getInstance().box.height / 2) +
          randomNumber(22, intensity)
      ),
      {
        steps:
          intensity > 242
            ? randomNumber(1, 970 / intensity)
            : randomNumber(1, 620 / intensity),
        // ? randomNumber(1, 470 / intensity)
        // : randomNumber(1, 320 / intensity),
      }
    )
    await PlayerService.getInstance().page.mouse.up()
    return response
  }
}
