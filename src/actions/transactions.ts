import { Action } from "actionhero";
import * as cChain from "../modules/c-chain";
import * as pChain from "../modules/p-chain";
import * as xChain from "../modules/x-chain";

const X_CHAIN = "X";
const P_CHAIN = "P";
const C_CHAIN = "0x";

/// Transaction by hash ///
export class GetTransactionByHash extends Action {
  constructor() {
    super();
    this.name = "GetTransactionByHash";
    this.description =
      "I return information about Avalanche Transaction by hash. EXAMPLE: 0x118e1747566adeaab6afede9de76ebeb5b10bb56ec510a099fb5a82221e9d0e7";
    this.outputExample = {};
    this.inputs = {
      hash: { required: true },
    };
  }

  async run({ params }) {
    let result;

    let xChainResult = await xChain.getTransactionByIdFromXChain(params.hash);
    let cChainResult = await cChain.getTransactionByHashFromCChain(params.hash);
    let pChainResult = await pChain.getTransactionByIdFromPChain(params.hash);

    if (xChainResult != 1) {
      result = xChainResult;
      return { result };
    } else if (cChainResult[0] != 1) {
      result = cChainResult[1];
      return { result };
    } else if (pChainResult != 1) {
      result = pChainResult;
      return { result };
    } else
      return {
        result: "connection refused to avalanche client or api call rejected",
      };
  }
}

/// X transactions after Nth from Address ///
export class GetXTransactionsAfterNthFromAddress extends Action {
  constructor() {
    super();
    this.name = "GetXTransactionsAfterNthFromAddress";
    this.description =
      "I return information about Avalanche X transactions after Nth transaction";
    this.outputExample = {};
    this.inputs = {
      address: { required: true },
      n: { required: true },
      x: { required: true },
    };
  }

  async run({ params }) {
    let xChainTransactions;
    let pChainTransactions;
    let cChainTransactions;
    let returnData;

    if (params.address.charAt(0) == X_CHAIN) {
      xChainTransactions =
        await xChain.getXTransactionsAfterNthFromAddressFromXChain(
          params.address,
          params.n,
          params.x
        );

      if (xChainTransactions[0] == 1) {
        returnData = xChainTransactions[1];

        return { returnData };
      } else {
        returnData = xChainTransactions[1];

        return { returnData };
      }
    } else if (params.address.charAt(0) == P_CHAIN) {
      pChainTransactions =
        await pChain.getXTransactionsAfterNthFromAddressFromPChain(
          params.address,
          params.n,
          params.x
        );

      if (pChainTransactions == 1) {
        return { result: "api call rejected or not enough transactions" };
      } else {
        returnData = pChainTransactions;

        return { returnData };
      }
    } else if (params.address.slice(0, 2) == C_CHAIN) {
      cChainTransactions =
        await cChain.getXTransactionsAfterNthFromAddressFromCChain(
          params.address,
          params.n,
          params.x
        );

      if (cChainTransactions == 1) {
        return { result: "api call rejected or not enough transactions" };
      } else {
        returnData = cChainTransactions;

        return { returnData };
      }
    } else {
      return { result: "wrong chain" };
    }
  }
}

/// X Pending Transactions after Nth transaction ///
export class GetXPendingTransactionsAfterNth extends Action {
  constructor() {
    super();
    this.name = "GetXPendingTransactionsAfterNth";
    this.description =
      "I return information about X Avalanche pending transactions after Nth transaction";
    this.outputExample = {};
    this.inputs = {
      n: { required: true },
      x: { required: true },
    };
  }

  async run({ params }) {
    let cChainTransactions;
    let returnData;

    if (params.n > 0 && params.x > 0) {
      cChainTransactions =
        await cChain.getXPendingTransactionsAfterNthFromCChain(
          params.n,
          params.x
        );

      if (cChainTransactions[0] == 1) {
        returnData = cChainTransactions[1];

        return { returnData };
      } else {
        returnData = cChainTransactions[1];

        return { returnData };
      }
    } else {
      return { result: "n and x < 0" };
    }
  }
}

/// Recent Transactions X-chain ///
export class GetRecentTransactionsFromXChain extends Action {
  constructor() {
    super();
    this.name = "GetRecentTransactionsFromXChain";
    this.description =
      "I return information about recent transactions from X chain";
    this.outputExample = {};
  }

  async run() {
    let xChainTransactions;
    let returnData;

    xChainTransactions = await xChain.getRecentTransactions();

    returnData = xChainTransactions[1];

    return { returnData };
  }
}

// Recent Transactions P-chain ///
export class GetRecentTransactionsFromPChain extends Action {
  constructor() {
    super();
    this.name = "GetRecentTransactionsFromPChain";
    this.description =
      "I return information about recent transactions from P chain";
    this.outputExample = {};
  }

  async run() {
    let pChainTransactions;
    let returnData;

    pChainTransactions = await pChain.getRecentTransactions();

    returnData = pChainTransactions[1];

    return { returnData };
  }
}
