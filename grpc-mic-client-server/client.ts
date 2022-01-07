/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { Error as GrpcWebError } from 'grpc-web'
import { ChatClient } from './proto/chat_grpc_web_pb'
import { ClientMessage, ServerMessage } from './proto/chat_pb'
import { Wave } from './wave/'

let user: string
let interval: any = null

window.addEventListener('DOMContentLoaded', () => {
  init(user)
})

async function init(user: string) {
  const client = new ChatClient('http://' + window.location.hostname + ':8080')

  const clientMessage = new ClientMessage()
  clientMessage.setUser(user)

  const stream = client.join(clientMessage)
  stream.on('data', (message: ServerMessage) => {
    // console.log('client stream.on data message ', message);
  })

  let wave: Wave
  function tick() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (wave?.current_stream?.data) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // console.log('tick wave -> ', wave?.current_stream?.data);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      sendMessage(wave?.current_stream?.data?.join(',').replaceAll(',0', ''))
    }
  }
  navigator.mediaDevices
    .getUserMedia({
      audio: true,
    })
    .then(function (stream) {
      if (!wave) {
        wave = new Wave()
      }
      wave.fromStream(stream, 'visual-canvas', {
        type: 'shine',
        colors: ['red', 'white', 'blue'],
      })
      if (interval) {
        clearInterval(interval)
      }
      interval = setInterval(tick, 2)
    })
    .catch(function (err) {
      console.log(err.message)
    })

  function sendMessage(message: string) {
    const clientMessage = new ClientMessage()
    clientMessage.setUser(user)
    clientMessage.setText(message)
    client.send(
      clientMessage,
      undefined,
      (err: GrpcWebError, response: ServerMessage) => {
        if (err) {
          console.error(err)
          return
        }

        // console.log('response', response.toObject());
      }
    )
  }

  document.getElementById('submit-message')?.addEventListener(
    'submit',
    (e) => {
      e.preventDefault()
      const message =
        (document.getElementById('message') as HTMLFormElement)?.value ||
        'a b c'
      sendMessage(message)
    },
    false
  )
}
