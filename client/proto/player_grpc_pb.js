// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var proto_player_pb = require('../proto/player_pb.js');

function serialize_player_package_ClientMessage(arg) {
  if (!(arg instanceof proto_player_pb.ClientMessage)) {
    throw new Error('Expected argument of type player_package.ClientMessage');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_player_package_ClientMessage(buffer_arg) {
  return proto_player_pb.ClientMessage.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_player_package_ServerMessage(arg) {
  if (!(arg instanceof proto_player_pb.ServerMessage)) {
    throw new Error('Expected argument of type player_package.ServerMessage');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_player_package_ServerMessage(buffer_arg) {
  return proto_player_pb.ServerMessage.deserializeBinary(new Uint8Array(buffer_arg));
}


var PlayerServiceService = exports.PlayerServiceService = {
  pointBit: {
    path: '/player_package.PlayerService/pointBit',
    requestStream: false,
    responseStream: false,
    requestType: proto_player_pb.ClientMessage,
    responseType: proto_player_pb.ServerMessage,
    requestSerialize: serialize_player_package_ClientMessage,
    requestDeserialize: deserialize_player_package_ClientMessage,
    responseSerialize: serialize_player_package_ServerMessage,
    responseDeserialize: deserialize_player_package_ServerMessage,
  },
};

exports.PlayerServiceClient = grpc.makeGenericClientConstructor(PlayerServiceService);
