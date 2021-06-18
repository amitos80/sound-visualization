const puppeteer = require('puppeteer');
const Mic = require('node-microphone');
const Stream = require('stream');
const Buffer = require('buffer');
const _ = require('lodash');

const randomNumber = (min, max) => Math.floor(Math.random() * (max - min) + min);

 async function pointBit(page, intensity) {
    const el = await page.$('.erd_scroll_detection_container > div');
    const box = await el.boundingBox();

    let factor = Math.floor(Math.abs(123 - Math.floor(intensity)) ) || 0;

    await page.mouse.down();
    await page.mouse.move(box.x + (box.width / 2), box.y + (box.height /  2));
    await page.mouse.up();

    if(factor > 6) {
        await page.mouse.down();

        await page.mouse.move(box.x + (box.width / 2) - factor, box.y + (box.height /  2) - factor);
        await page.mouse.move(box.x + (box.width / 2) + factor, box.y + (box.height /  2) + factor);

        await page.mouse.up();
    }

    // await page.mouse.up();

    await page.mouse.down();

    const iterations = factor > 80 ? Math.floor(factor / 33) : 0;
    // console.log('factor -> ', factor);

    for(let i = 0; i < iterations ; i++) {
        await page.mouse.move(randomNumber(200, 1280), randomNumber(200,  720));
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
        const avg = _.meanBy(signals.slice(Math.max(signals.length - 5, 1)), v => v)
        await pointBit(page, Math.floor(avg));

        // if(avg > 122) {
        //
        //
        //     let sum = 0;
        //     pointBit(page, Math.floor(sum / 10));
        //     for(let i = signals.length - 1; i > signals.length - 11; i--) {
        //         sum += signals[i];
        //         if (i % 220 === 0) {
        //
        //             sum = 0;
        //         }
        //     }
        // }
    });

    micStream.on('end', () => {
        const buf = Buffer.concat(bufs);
    })

})();
