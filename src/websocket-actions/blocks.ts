import * as dotenv from "dotenv";

import * as cChainMethods from "./../modules/c-chain";

dotenv.config();

//get block by hash
export async function getBlockByHash(ws, hash: string) {
  const blockFromCChain = await cChainMethods.getBlockByHashFromCChain(hash);

  if (blockFromCChain[0] == 1) {
    ws.send(JSON.stringify(blockFromCChain[1]));
  }
  ws.send(JSON.stringify(blockFromCChain[1]));
}

//get block by number
export async function getBlockByNumber(ws, blocknumber: string) {
  const cChainNumber = await cChainMethods.getBlockByNumberFromCChain(
    blocknumber
  );

  if (cChainNumber[0] == 1) {
    ws.send(JSON.stringify(cChainNumber[1]));
  }
  ws.send(JSON.stringify(cChainNumber[0]));
}

//GET X blocks after N-th
export async function getXBlocksFromNthFromCChain(
  ws,
  blocknumber: string,
  blockcount: string
) {
  const cChainArray = [];
  let k = 0;

  const blockNumber = parseInt(blocknumber);
  const count = parseInt(blockcount);

  for (let i = blockNumber - count; i < blockNumber; ++i) {
    let hashValue = await cChainMethods.getBlockByNumberFromCChain("");

    if (hashValue[0] == 1) {
      ws.send(JSON.stringify(hashValue[1]));
    } else {
      cChainArray[k] = hashValue[1];
      k++;
    }
  }

  ws.send(JSON.stringify(cChainArray));
}
