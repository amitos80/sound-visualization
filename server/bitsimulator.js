const puppeteer = require('puppeteer');
const Mic = require('node-microphone');
const Stream = require('stream');
const Buffer = require('buffer');
const _ = require('lodash');

const randomNumber = (min, max) => Math.floor(Math.random() * (max - min) + min);

 async function pointBit(page, intensity) {
    const el = await page.$('.erd_scroll_detection_container > div');
    const box = await el.boundingBox();

    console.log('intensity -> ', intensity);
    const factor = Math.floor(Math.abs(126 - Math.floor(intensity)) > 6 ? 8 : 1);

    await page.mouse.move(box.x + (box.width / 2), box.y + (box.height /  2));
    await page.mouse.down();

    const x = randomNumber(200, 1280 - (intensity * 15));
    const y = randomNumber(200,  intensity * 15);

    await page.mouse.down();

    for(let i = 0; i < 15; i++) {
        await page.mouse.move(x+ Math.floor(factor*3), y + Math.floor(factor*3));
    }

    await page.mouse.up();
}

class EchoStream extends Stream.Writable {
    constructor(props) {
        super(props);

        this.str = ''
        this._chunk = ''
        this._writable = true;
        this._bytes = 0;
    }

    _write(chunk, enc, next) {
        this._bytes += chunk.length;

        // console.log('_write chunk: ' + chunk);
        // console.log('_write enc: ' + enc);
        // console.log('_write bytes length: ' + this._bytes);
        next();
    }

    _end(buf) {
        if(arguments.length) this._write(buf);
        this._writable = false;
        console.log('_end bytes length: ' + this._bytes);
    }

    _data(data) {
        this.str += data.toString()
        console.log('_data data: ' + this.str);
    }
}

(async () => {
    // const browser = await puppeteer.launch();
    const browser = await puppeteer.launch({ headless: false, slowMo: 0 });
    const page = await browser.newPage();
    await page.goto('http://localhost:3000');
//rate: 44100, channels: 1
    let mic = new Mic({ });
    const bufs = [];

    mic.on('info', (info) => {

    });
    mic.on('error', (error) => {
        console.log('mic error ', error);
    });

    let micStream = mic.startRecording();
    micStream.on('data',async d => {
        const signals = [...d]
        const avg = _.meanBy(signals, v => v)
        if(avg > 124) {
            const points = avg - 126;
            for(let i = 0; i < points; i+=80) {
                await pointBit(page, avg);
            }
        }


    });
    micStream.on('end', () => {
        const buf = Buffer.concat(bufs);
    })


    //mic.stopRecording();


    //pointBit(page);



    // setTimeout(async () => {
    //
    //     await browser.close();
    //     // clearInterval(interval)
    //
    // }, 5000)

})();
