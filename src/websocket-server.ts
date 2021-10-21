
import * as WebSocket from "ws";
import * as dotenv from "dotenv";

dotenv.config();

import * as websocketAddressMethods from "./websocket-actions/address";
import * as websocketBlockMethods from "./websocket-actions/blocks";
import * as websocketTransactionMethods from "./websocket-actions/transactions";
import * as websocketNetworkInfo from "./websocket-actions/activity";


dotenv.config();

const wss = new WebSocket.WebSocketServer({ port: 4445 });

wss.on('connection', (ws, req) => {
    console.log(`New connection from IP: ${req.socket.remoteAddress}`);

    ws.on('message', (jsonData) => {
        let message;

        try {
            message = JSON.parse(jsonData.toString());
        } catch (error) {
            ws.send('Wrong message format - must be JSON');
            return;
        }

        switch(message.method) {
            case 'getAddressInfoByHash':
                websocketAddressMethods.getAddressInfoByHash(message.params.hash);
                break;

            case 'getBlockByHash':
                websocketBlockMethods.getBlockByHash(message.params.hash);
                break;

            case 'getBlockByNumber':
                websocketBlockMethods.getBlockByNumber(message.params.blocknumber);
                break;

            case 'getXBlocksFromNthFromCChain':
                websocketBlockMethods.getXBlocksFromNthFromCChain(message.params.blocknumber, message.params.blockcount);
                break;

            case 'getTransactionByHash':
                websocketTransactionMethods.getTransactionByHash(message.params.hash);
                break;

            case 'getXTransactionsAfterNthFromAddress':
                websocketTransactionMethods.getXTransactionsAfterNthFromAddress(message.params.address, message.params.n, message.params.x);
                break;

            case 'getXPendingTransactionsAfterNth':
                websocketTransactionMethods.getXPendingTransactionsAfterNth(message.params.n, message.params.x);
                break;

            case 'getRecentTransactionsFromXChain':
                websocketTransactionMethods.getRecentTransactionsFromXChain();
                break;

            case 'getRecentTransactionsFromPChain':
                websocketTransactionMethods.getRecentTransactionsFromPChain();
                break;

            case 'getNetWorkActivity':
                websocketNetworkInfo.getNetWorkActivity();
                break;
        }
    });
});