
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
    console.log(`New connection `);
    
    ws.on('message', (jsonData) => {
        let message = JSON.parse(jsonData.toString())
        
        switch(message.method) {
            case 'getAddressInfoByHash':
                websocketAddressMethods.getAddressInfoByHash(ws,message.params.hash);
                break;

            case 'getBlockByHash':
                websocketBlockMethods.getBlockByHash(ws,message.params.hash);
                break;

            case 'getBlockByNumber':
                websocketBlockMethods.getBlockByNumber(ws,message.params.blocknumber);
                break;

            case 'getXBlocksFromNthFromCChain':
                websocketBlockMethods.getXBlocksFromNthFromCChain(ws,message.params.blocknumber, message.params.blockcount);
                break;

            case 'getTransactionByHash':
                websocketTransactionMethods.getTransactionByHash(ws,message.params.hash);
                break;

            case 'getXTransactionsAfterNthFromAddress':
                websocketTransactionMethods.getXTransactionsAfterNthFromAddress(ws,message.params.address, message.params.n, message.params.x);
                break;

            case 'getXPendingTransactionsAfterNth':
                websocketTransactionMethods.getXPendingTransactionsAfterNth(ws,message.params.n, message.params.x);
                break;

            case 'getRecentTransactionsFromXChain':
                websocketTransactionMethods.getRecentTransactionsFromXChain(ws);
                break;

            case 'getRecentTransactionsFromPChain':
                websocketTransactionMethods.getRecentTransactionsFromPChain(ws);
                break;

            case 'getNetWorkActivity':
                websocketNetworkInfo.getNetWorkActivity(ws);
                break;
        }
    });
});