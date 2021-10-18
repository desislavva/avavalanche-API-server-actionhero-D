import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

/////////////////////////////////////////////////////////// TRANSACTIONS ////////////////////////////////////////////////////////////

export async function getTransactionByIdFromXChain(txId: string) {
  let response;

  try {
    response = await axios.get(
      `${process.env.ORTELIUS_API_ENDPOINT + `transactions/${txId}`}`
    );
  } catch (error) {
    return 1;
  }

  return response.data;
}

export async function getXTransactionsAfterNthFromAddressFromXChain(
  address: string,
  n: number,
  x: number
) {
  let response;

  try {
    response = await axios.get(
      `${
        process.env.ORTELIUS_API_ENDPOINT +
        `transactions?address=${address}&limit=1&sort=timestamp-desc`
      }`
    );
  } catch (error) {
    return [1, error];
  }

  return [0, response.data.transactions];
}

export async function getRecentTransactions() {
  let response;

  try {
    response = await axios.get(
      `${
        process.env.ORTELIUS_API_ENDPOINT +
        `transactions?chainID=2JVSBoinj9C2J33VntvzYtVJNZdN2NKiwwKjcumHUWEb5DbBrm&limit=1&sort=timestamp-desc`
      }`
    );
  } catch (error) {
    return [1];
  }

  return [0, response.data.transactions[0]];
}

///////////////////////////////////////////////////////////// ADDRESS ////////////////////////////////////////////////////////////

export async function getAddressInfoByHashFromXChain(address: string) {
  let result;

  await axios
    .post(
      process.env.X_CHAIN_BC_CLIENT_BLOCK_ENDPOINT,
      {
        jsonrpc: "2.0",
        id: 1,
        method: "avm.getAllBalances",
        params: {
          address: `${address}`,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
    .then((response) => {
      result = [0, (<any>response).data.result];
    })
    .catch((error) => {
      if (!error.response) {
        console.log("connection refused to avalanche client");
        result = [
          1,
          JSON.parse('{"result":"connection refused to avalanche client"}'),
        ];
      } else {
        console.log(error.response.data);
        result = [1, error.response.data];
      }
    });

  if (result[0] == 1 || typeof result[1] == "undefined") {
    result[0] = 1;
    return result;
  }

  let responseForAssets;

  if (result[1].balances.length <= 0) {
    return [result[1].balances, "AVAX"];
  }

  for (let i = 0; i < result[1].balances.length; i++) {
    responseForAssets = await axios.post(
      process.env.X_CHAIN_BC_CLIENT_BLOCK_ENDPOINT,
      {
        jsonrpc: "2.0",
        id: 1,
        method: "avm.getAssetDescription",
        params: {
          assetID: `${result[1].balances[i].asset}`,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }

  return [result[1].balances, responseForAssets.data.result];
}
