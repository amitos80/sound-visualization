module.exports = {
    ssr: false,
    serverRuntimeConfig: {
        ssr: false,
        // Will only be available on the server side
        mySecret: 'secret',
        secondSecret: process.env.SECOND_SECRET, // Pass through env variables
    },
    publicRuntimeConfig: {
        // Will be available on both server and client
        staticFolder: '/static',
        ssr: false,
    },
}
