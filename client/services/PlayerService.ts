import * as grpcWeb from 'grpc-web';
//import {RpcError as GrpcWebError} from 'grpc-web';
import { PlayerServiceClient } from '../proto/player_grpc_web_pb';
import { ClientMessage, ServerMessage} from '../proto/player_pb';



export class PlayerService extends PlayerServiceClient  {
    private client: any;
    private host: string;

    constructor (hostname: string,
                 credentials?: null,
                 options?: null | { [index: string]: any; }) {
        if (typeof window === 'undefined') return;

        const address = hostname || `http://${window.location.hostname}:50051`
        super(address, credentials, options)
        this.host = address

        if (!this.client) {
            this.client = new PlayerServiceClient('http://' + window.location.hostname + ':50051');
        }
    }

    pointBit(request: ClientMessage, metadata: grpcWeb.Metadata | undefined,
             callback: (err: grpcWeb.RpcError, response: ServerMessage) => void): grpcWeb.ClientReadableStream<ServerMessage> {
        //super.pointBit(request, metadata, callback);

        if (typeof window === 'undefined') return;
        if (!this.client) {
            this.client = new PlayerServiceClient('http://localhost:50051');
        }

        //console.log('PlayerService.prototype.pointBit request => ', request)


        const {a, b, c, d} = request.toObject()

        console.log('PlayerService.prototype.pointBit request => ', {a, b, c, d})

        const clientMessage = new ClientMessage();
        clientMessage.setA(a);
        clientMessage.setB(b);
        clientMessage.setC(c);
        clientMessage.setD(d);
        if(this.client) {
            this.client.pointBit(
                clientMessage,
                undefined,
                (err: any, response: ServerMessage) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log('response', response.toObject());

                    }
                })
        }


    }



}

// PlayerService.prototype.join = function join(params:ClientMessage) {
//     if (!client) {
//         client = new PlayerServiceClient('http://' + window.location.hostname + ':50051');
//     }
//     const clientMessage = new ClientMessage();
//     clientMessage.setA('542')
//     clientMessage.setB('234')
//     clientMessage.setC('1252')
//     clientMessage.setD('2345')
//     const stream = client.pointBit(clientMessage);
//     stream.on('data', (message: ServerMessage) => {
//         console.log(`client received$ ${message}`)
//     });
// }
//
// PlayerService.prototype.send = function (params:ClientMessage) {
//     if (!client) {
//         client = new PlayerServiceClient('http://' + window.location.hostname + ':50051');
//     }
//     const clientMessage = new ClientMessage();
//     clientMessage.setA(params.getA());
//     clientMessage.setB(params.getB());
//     clientMessage.setC(params.getC());
//     clientMessage.setD(params.getD());
//     client.pointBit(
//         clientMessage,
//         undefined,
//         (err: any, response: ServerMessage) => {
//             if (err) {
//                 console.error(err);
//             } else {
//                 console.log('response', response.toObject());
//                 (document.getElementById('message') as HTMLFormElement)!.value = '';
//             }
//         })
// }

// PlayerService.prototype.pointBit = function (ctx) {
//     if (typeof window === 'undefined') return;
//     if (!client) {
//         client = new PlayerServiceClient('http://' + window.location.hostname + ':50051');
//     }
//
//     console.log('PlayerService.prototype.pointBit ctx => ', ctx)
//     const [a, b, c, d] = ctx.array
//     const clientMessage = new ClientMessage();
//     clientMessage.setA(a);
//     clientMessage.setB(b);
//     clientMessage.setC(c);
//     clientMessage.setD(d);
//     if(client) {
//         client.pointBit(
//             clientMessage,
//             undefined,
//             (err: any, response: ServerMessage) => {
//                 if (err) {
//                     console.error(err);
//                 } else {
//                     console.log('response', response.toObject());
//
//                 }
//             })
//     }
//
// }


export default PlayerService
