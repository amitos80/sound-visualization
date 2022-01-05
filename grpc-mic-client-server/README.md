
# browser streams over grpc sound to server

## App layout

- [package.json](./package.json) - Dependencies and node build scripts
- [compile-proto.sh](./compile-proto.sh) - The proto compiler script
- [proto/](./proto/) - Protobuf definitions and generated types
- [server.ts](./server.ts) - The grpc server
- [client.ts](./client.ts) - The grpc client

## Generating the Types

```sh
npm install
./compile-proto.sh
```

### Running the app

(Note, docker is required to run the envoy proxy.)

Run mic input client:

```bash
npm install
npm run build
python3 -m http.server 8081
```

Run server:

```bash
npm install
npm run build
npm run start:server
```
