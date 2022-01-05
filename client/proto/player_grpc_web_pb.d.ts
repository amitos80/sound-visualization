import * as grpcWeb from 'grpc-web';

import * as proto_player_pb from '../proto/player_pb';


export class PlayerServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  pointBit(
    request: proto_player_pb.ClientMessage,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: proto_player_pb.ServerMessage) => void
  ): grpcWeb.ClientReadableStream<proto_player_pb.ServerMessage>;

}

export class PlayerServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  pointBit(
    request: proto_player_pb.ClientMessage,
    metadata?: grpcWeb.Metadata
  ): Promise<proto_player_pb.ServerMessage>;

}

