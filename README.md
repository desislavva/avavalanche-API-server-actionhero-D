# My Avalanche actionhero API Project

_Visit www.actionherojs.com for more information about Actionhero._

## To install:

(assuming you have [node](http://nodejs.org/), [TypeScript](https://www.typescriptlang.org/), and NPM installed)

`npm install`

## Config

Setup your .env file.
Template:


SERVER_PORT=        # set your NodeJS API http server port
WEBSOCKET_PORT=     # set your WebSocket port

C_CHAIN_BC_CLIENT_BLOCK_ENDPOINT= # define your avalanche client C-Chain endpoint (full path)
X_CHAIN_BC_CLIENT_BLOCK_ENDPOINT= # define your avalanche client X-Chain endpoint (full path)
P_CHAIN_BC_CLIENT_BLOCK_ENDPOINT= # define your avalanche client X-Chain endpoint (full path)

X_CHAIN_ID= # define X-Chain blockchain id (testnet and mainnet have different ids)
P_CHAIN_ID= # define P-Chain blockchain id (testnet and mainnet have different ids)
C_CHAIN_ID= # define P-Chain blockchain id (testnet and mainnet have different ids)

ORTELIUS_API_ENDPOINT= # define your Ortelius API endpoint (full path)


## To Run:

`npm run dev`

