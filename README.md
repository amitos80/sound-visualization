**Liquidish shapes in vivid colors changing to the beat**

# client: liquid animation canvas (localhost:3000)

    ## Generating the Types
    ```sh
    npm install
    ./compile-proto.sh
    ```

# grpc-mic-client-server: browser (localhost:8081) streams over grpc sound to server, server uses puppetier to trigger events on canvas (localhost:3000)

    ## Generating the Types
    ```sh
    npm install
    ./compile-proto.sh
    ```

    ## Run server:
    ```bash
    cd grpc-mic-client-server
    npm install
    npm run build
    npm run start:server
    ```

    ## Run mic input client:
    ```bash
    cd grpc-mic-client-server
        npm install
        npm run build
        npm run start:client
    ```

    ## Note, docker is required to run the envoy proxy ()
    ```bash
    cd grpc-mic-client-server
        npm install
        npm run start:proxy
    ```



