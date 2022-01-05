const puppeteer = require('puppeteer')
// const Stream = require('stream')
// const Buffer = require('buffer')
const _ = require('lodash')

const randomNumber = (min, max) => Math.floor(Math.random() * (max - min) + min)

function noiseLevel(inputSamples) {
  let average = _.meanBy(inputSamples, (v) => v) / inputSamples.length
  const power = inputSamples.reduce(
    (acc, val) => acc + Math.pow(val - average, 2),
  )
  return Math.sqrt(power)
}

function findTone(inputSamples) {
  const sampleRate = 44100 // Or whatever in use (Hz)
  const tone = 500 // tone to detect in Hz
  const sin500Hz = inputSamples.map(
    (val, i) =>
      Math.sin(((2 * Math.PI * tone) / sampleRate) * i) /
      Math.sqrt(inputSamples.length),
  )
  const cos500Hz = inputSamples.map(
    (val, i) =>
      Math.cos(((2 * Math.PI * tone) / sampleRate) * i) /
      Math.sqrt(inputSamples.length),
  )

  const amplitudeSin = _.meanBy(inputSamples, (val, i) => val * sin500Hz[i])
  const amplitudeCos = _.meanBy(inputSamples, (val, i) => val * cos500Hz[i])

  return Math.sqrt(amplitudeSin * amplitudeSin + amplitudeCos * amplitudeCos)
}

export function PuppetierPlayerService() {}

PuppetierPlayerService.prototype.init = async function init() {
  this.browser = await puppeteer.launch({headless: false, slowMo: 0})
  this.page = await this.browser.newPage()
  await this.page.setViewport({width: 1440, height: 800})
  await this.page.goto('http://localhost:3000')

  this.visualArea = await this.page.$('.anim')
  if (this.visualArea) {
    this.box = await this.visualArea.boundingBox()
  }
}

PuppetierPlayerService.prototype.pointBit = function pointBit(params = {intensity: 220}) {
  console.log('PuppetierPlayerService.prototype.pointBit -> ');

  const { intensity } = params
  if (intensity > 34) {
    this.page.mouse.down()
    for (let i = 0; i < Math.floor(intensity / 4); i++) {
      this.mouseDown(intensity)
    }
    this.mouseUp()
  }
}

PuppetierPlayerService.prototype.join = function join(params = {intensity: 220}) {
  const { intensity } = params
  if (intensity > 34) {
    this.page.mouse.down()
    for (let i = 0; i < Math.floor(intensity / 4); i++) {
      this.mouseDown(intensity)
    }
    this.mouseUp()
  }
}

PuppetierPlayerService.prototype.mouseUp = async function mouseUp() {
  await this.page.mouse.up()
}

PuppetierPlayerService.prototype.mouseDown = async function mouseDown(intensity) {
  await this.page.mouse.move(
      randomNumber(this.box.x, 500) + randomNumber(2, intensity),
      randomNumber(this.box.x, 500) + randomNumber(2, 300),
  )
}



export default PuppetierPlayerService

// new Promise(async (resolve, reject) => {
//   const player = new Pupetierplayer()
//   await player.init()
// })
//   .then((r) => console.log('r -> ', r))
//   .catch((e) => console.log('e -> ', e))
