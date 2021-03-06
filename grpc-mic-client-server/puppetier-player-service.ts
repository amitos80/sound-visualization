import { sum, take } from 'lodash'
// @ts-ignore
import puppeteer from 'puppeteer'
import * as proto_chat_pb from './proto/chat_pb'

const VIEW_WIDTH = 1700
const VIEW_HEIGHT = 1080
const THRESHOLD = 238

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
    try {
      const response = new proto_chat_pb.ServerMessage()
      response.setA('1')
      response.setB('2')
      response.setC('3')
      response.setD('4')

      const sample =
        clientMessage.array?.length &&
        clientMessage.array[1]?.split(',').filter((n: any) => !isNaN(Number(n)))
      if (!sample?.length) return response

      const blockSize = Math.floor(sample?.length / 4)

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

      if ((a < 75 && b < 77 && c < 60 && d < 65) || intensity < THRESHOLD) {
        return response
      }
      console.log(
        'intensity ',
        intensity,
        'a ',
        a,
        'b ',
        b,
        'c ',
        c,
        'd ',
        d,
        ' THRESHOLD ',
        THRESHOLD,
        ' intensity -  THRESHOLD ',
        intensity - THRESHOLD
      )
      await PlayerService.getInstance().page.mouse.down(
        PlayerService.getInstance().box.width / 2,
        PlayerService.getInstance().box.height / 2
      )
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
            intensity > 339
              ? randomNumber(1, 570 / intensity)
              : randomNumber(1, 480 / intensity),
          // ? randomNumber(1, 470 / intensity)
          // : randomNumber(1, 320 / intensity),
        }
      )
      await PlayerService.getInstance().page.mouse.up()
      return response
    } catch (e) {
      console.log(e)
    }
  }
}
