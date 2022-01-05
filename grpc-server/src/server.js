import * as grpc from '@grpc/grpc-js';
import { PlayerServiceService } from '../proto/player_grpc_pb';
import { ClientMessage, ServerMessage } from '../proto/player_pb';
import { PlayerServiceRpc }  from './service/puppetier-player-service.ts'


//: IPlayerServiceServer
const playerServer = {
  // join(call: grpc.ServerWritableStream<ClientMessage, ServerMessage>): void {
  //   PlayerServiceRpc.pointBit(call.request, null)
  // },

  join(call){
    PlayerServiceRpc.pointBit(call.request, null)
  },
  // pointBit(call: grpc.ServerWritableStream<ClientMessage, ServerMessage>): void {
  //
  //   PlayerServiceRpc.pointBit(call.request, null)
  //
  //
  // },

  pointBit(call) {

    PlayerServiceRpc.pointBit(call.request, null)


  },
  // send(
  //     call,
  //     callback
  // ): void {
  //   PlayerServiceRpc.pointBit(call.request, null)
  // },
  send(
      call,
      callback
  ) {
    PlayerServiceRpc.pointBit(call.request, null)
  },
};

//export function getServer(): grpc.Server {
export function getServer(){
  const server = new grpc.Server();
  server.addService(PlayerServiceService, playerServer);
  return server;
}

if (require.main === module) {
  const server = getServer();
  server.bindAsync(
      '0.0.0.0:50051',
      grpc.ServerCredentials.createInsecure(),
      // (err: Error | null, port: number) => {
      (err, port) => {
        if (err) {
          console.error(`Server error: ${err.message}`);
        } else {
          console.log(`Server bound on port: ${port}`);
          server.start();
        }
      }
  );
}
