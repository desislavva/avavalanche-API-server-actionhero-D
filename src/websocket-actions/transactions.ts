import * as dotenv from "dotenv";

dotenv.config();

import * as cChainMethods from "./../modules/c-chain";
import * as xChainMethods from "./../modules/x-chain";
import * as pChainMethods from "./../modules/p-chain";

const X_CHAIN = "X";
const P_CHAIN = "P";
const C_CHAIN = "0x";

export async function getTransactionByHash(ws, hash: string) {
  let xChainTransaction;
  let cChainTransaction;
  let pChainTransaction;

  xChainTransaction = await xChainMethods.getTransactionByIdFromXChain(hash);
  cChainTransaction = await cChainMethods.getTransactionByHashFromCChain(hash);
  pChainTransaction = await pChainMethods.getTransactionByIdFromPChain(hash);

  if (
    xChainTransaction == 1 &&
    cChainTransaction[0] == 1 &&
    pChainTransaction == 1
  ) {
    return JSON.stringify(
      '{"result":"connection refused to avalanche client or api call rejected"}'
    );
  } else if (xChainTransaction != 1) {
    return JSON.stringify(xChainTransaction);
  } else if (cChainTransaction[0] != 1) {
    return JSON.stringify(cChainTransaction[1]);
  } else if (pChainTransaction != 1) {
    return JSON.stringify(pChainTransaction);
  }
}

export async function getXTransactionsAfterNthFromAddress(
  ws,
  address: string,
  n: string,
  x: string
) {
  let xChainTransactions;
  let pChainTransactions;
  let cChainTransactions;

  if (address.charAt(0) == X_CHAIN) {
    xChainTransactions =
      await xChainMethods.getXTransactionsAfterNthFromAddressFromXChain(
        address,
        parseInt(n),
        parseInt(x)
      );

    if (xChainTransactions[0] == 1) {
      return JSON.stringify(xChainTransactions[1]);
    }
    return JSON.stringify(xChainTransactions[1]);
  } else if (address.charAt(0) == P_CHAIN) {
    pChainTransactions =
      await pChainMethods.getXTransactionsAfterNthFromAddressFromPChain(
        address,
        parseInt(n),
        parseInt(x)
      );

    if (pChainTransactions == 1) {
      return JSON.stringify(
        '{"result":"api call rejected or not enough transactions"}'
      );
    }
    return JSON.stringify(pChainTransactions);
  } else if (address.slice(0, 2) == C_CHAIN) {
    cChainTransactions =
      await cChainMethods.getXTransactionsAfterNthFromAddressFromCChain(
        address,
        parseInt(n),
        parseInt(x)
      );
    return JSON.stringify(cChainTransactions);
  } else {
    return JSON.stringify('{"result":"wrong chain"}');
  }
}

export async function getXPendingTransactionsAfterNth(
  ws,
  n: string,
  x: string
) {
  let cChainTransactions;

  if (parseInt(n) > 0 && parseInt(x) > 0) {
    cChainTransactions =
      await cChainMethods.getXPendingTransactionsAfterNthFromCChain(
        parseInt(n),
        parseInt(x)
      );

    if (cChainTransactions[0] == 1) {
      return JSON.stringify(cChainTransactions[1]);
    }
    return JSON.stringify(cChainTransactions[1]);
  } else {
    return JSON.stringify('{"result":"n and x < 0"}');
  }
}

export async function getRecentTransactionsFromXChain(ws) {
  let xChainTransaction;

  xChainTransaction = await xChainMethods.getRecentTransactions();

  if (xChainTransaction[0] == 1) {
    return JSON.stringify(xChainTransaction[1]);
  }
  return JSON.stringify(xChainTransaction[1]);
}

export async function getRecentTransactionsFromPChain(ws) {
  let pChainTransaction;

  pChainTransaction = await pChainMethods.getRecentTransactions();

  if (pChainTransaction[0] == 1) {
    return JSON.stringify(pChainTransaction[1]);
  }
  return JSON.stringify(pChainTransaction[1]);
}
