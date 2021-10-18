import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

/////////////////////////////////////////////////////////// TRANSACTIONS ////////////////////////////////////////////////////////////

export async function getTransactionByIdFromPChain(txId: string) {
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

export async function getXTransactionsAfterNthFromAddressFromPChain(
  address: string,
  n: number,
  x: number
) {
  let response;

  try {
    response = await axios.get(
      `${process.env.ORTELIUS_API_ENDPOINT}` + `transactions?address=${address}`
    );
  } catch (error) {
    return 1;
  }

  return response.data.transactions.slice(n - x, n);
}

export async function getRecentTransactions() {
  let response;

  try {
    response = await axios.get(
      `${
        process.env.ORTELIUS_API_ENDPOINT +
        `transactions?chainID=11111111111111111111111111111111LpoYY&limit=1&sort=timestamp-desc`
      }`
    );
  } catch (error) {
    return [1];
  }

  return [0, response.data.transactions[0]];
}

///////////////////////////////////////////////////////////// ADDRESS ////////////////////////////////////////////////////////////

export async function getAddressInfoFromPChain(address: string) {
  let result;

  await axios
    .post(
      process.env.P_CHAIN_BC_CLIENT_BLOCK_ENDPOINT,
      {
        jsonrpc: "2.0",
        id: 1,
        method: "platform.getBalance",
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

  return result;
}
