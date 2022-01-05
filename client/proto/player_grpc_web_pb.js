/**
 * @fileoverview gRPC-Web generated client stub for player_package
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.player_package = require('./player_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.player_package.PlayerServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.player_package.PlayerServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.player_package.ClientMessage,
 *   !proto.player_package.ServerMessage>}
 */
const methodDescriptor_PlayerService_pointBit = new grpc.web.MethodDescriptor(
  '/player_package.PlayerService/pointBit',
  grpc.web.MethodType.UNARY,
  proto.player_package.ClientMessage,
  proto.player_package.ServerMessage,
  /**
   * @param {!proto.player_package.ClientMessage} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.player_package.ServerMessage.deserializeBinary
);


/**
 * @param {!proto.player_package.ClientMessage} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.player_package.ServerMessage)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.player_package.ServerMessage>|undefined}
 *     The XHR Node Readable Stream
 */
proto.player_package.PlayerServiceClient.prototype.pointBit =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/player_package.PlayerService/pointBit',
      request,
      metadata || {},
      methodDescriptor_PlayerService_pointBit,
      callback);
};


/**
 * @param {!proto.player_package.ClientMessage} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.player_package.ServerMessage>}
 *     Promise that resolves to the response
 */
proto.player_package.PlayerServicePromiseClient.prototype.pointBit =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/player_package.PlayerService/pointBit',
      request,
      metadata || {},
      methodDescriptor_PlayerService_pointBit);
};


module.exports = proto.player_package;

