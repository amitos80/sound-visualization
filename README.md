# Liquidish shapes in vivid colors changing to the beat


**running instructions**
1. run proxy server at 8081 
2. cd grpc-mic-client-server && npm run start:client
3. cd client && npm run dev
4. cd grpc-mic-client-server && npm run start:server



*first time run (compiling grpc proto and build)*
**client: liquid animation canvas (localhost:3000)**

    ## Generating the Types
    ```sh
    npm install
    ./compile-proto.sh
    ```

    ## Run mic input client:
    ```bash
        cd client
        npm install
        npm run dev
    ```

**grpc-mic-client-server: browser (localhost:8081) streams over grpc sound to server, server uses puppetier to trigger events on canvas (localhost:3000)**

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



