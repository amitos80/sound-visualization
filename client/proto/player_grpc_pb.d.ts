// GENERATED CODE -- DO NOT EDIT!

// package: player_package
// file: proto/player.proto

import * as proto_player_pb from "../proto/player_pb";
import * as grpc from "@grpc/grpc-js";

interface IPlayerServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  pointBit: grpc.MethodDefinition<proto_player_pb.ClientMessage, proto_player_pb.ServerMessage>;
}

export const PlayerServiceService: IPlayerServiceService;

export interface IPlayerServiceServer extends grpc.UntypedServiceImplementation {
  pointBit: grpc.handleUnaryCall<proto_player_pb.ClientMessage, proto_player_pb.ServerMessage>;
}

export class PlayerServiceClient extends grpc.Client {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  pointBit(argument: proto_player_pb.ClientMessage, callback: grpc.requestCallback<proto_player_pb.ServerMessage>): grpc.ClientUnaryCall;
  pointBit(argument: proto_player_pb.ClientMessage, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<proto_player_pb.ServerMessage>): grpc.ClientUnaryCall;
  pointBit(argument: proto_player_pb.ClientMessage, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<proto_player_pb.ServerMessage>): grpc.ClientUnaryCall;
}
