import axios from "axios";
import * as dotenv from "dotenv";
import * as web3 from "web3-utils";

dotenv.config();

/////////////////////////////////////////////////////////// BLOCKS ////////////////////////////////////////////////////////////

export async function getBlockByHashFromCChain(hash: string) {
  let result;

  await axios
    .post(
      process.env.C_CHAIN_BC_CLIENT_BLOCK_ENDPOINT,
      {
        jsonrpc: "2.0",
        id: 1,
        method: "eth_getBlockByHash",
        params: [`${hash}`, true],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
    .then((response) => {
      result = [0, response.data];
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

export async function getBlockByNumberFromCChain(number: string) {
  let hexNumber;

  if (number == "latest") {
    hexNumber = number;
  } else {
    hexNumber = "0x" + parseInt(number).toString(16);
  }

  let result;

  await axios
    .post(
      process.env.C_CHAIN_BC_CLIENT_BLOCK_ENDPOINT,
      {
        jsonrpc: "2.0",
        id: 1,
        method: "eth_getBlockByNumber",
        params: [`${hexNumber}`, true],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
    .then((response) => {
      result = [response.data, (<any>response).data.result.hash];
    })
    .catch((error) => {
      if (!error.response) {
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

/////////////////////////////////////////////////////////// TRANSACTIONS ////////////////////////////////////////////////////////////

export async function getTransactionByHashFromCChain(hash: string) {
  let result;

  await axios
    .post(
      process.env.C_CHAIN_BC_CLIENT_BLOCK_ENDPOINT,
      {
        jsonrpc: "2.0",
        id: 1,
        method: "eth_getTransactionByHash",
        params: [`${hash}`],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
    .then((response) => {
      result = [0, response.data];
    })
    .catch((error) => {
      if (!error.response) {
        console.log("connection refused to avalanche client");
        result = [1];
      } else {
        console.log(error.response.data);
        result = [1];
      }
    });

  return result;
}

export async function getXPendingTransactionsAfterNthFromCChain(
  n: number,
  x: number
) {
  let result;

  await axios
    .post(
      process.env.C_CHAIN_BC_CLIENT_BLOCK_ENDPOINT,
      {
        jsonrpc: "2.0",
        id: 1,
        method: "eth_getBlockByNumber",
        params: ["pending", true],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
    .then((response) => {
      result = [0, (<any>response).data.result.transactions.slice(n - x, n)];
    })
    .catch((error) => {
      if (!error.response) {
        console.log("connection refused to avalanche client");
        result = [
          1,
          JSON.parse('{"result":"connection refused to avalanche client"}'),
        ];
      } else {
        console.log("api call rejected or not enough transactions");
        result = [
          1,
          JSON.parse(
            '{"result":"api call rejected or not enough transactions"}'
          ),
        ];
      }
    });

  return result;
}

export async function getXTransactionsAfterNthFromAddressFromCChain(
  address: string,
  n: number,
  x: number
) {
  let response;

  try {
    response = await axios.get(
      `${process.env.ORTELIUS_API_ENDPOINT}` +
        `ctransactions?address=${address}`
    );
  } catch (error) {
    return 1;
  }

  let result = response.data.transactions.slice(n - x, n);
  return result;
}

///////////////////////////////////////////////////////////// ADDRESS ////////////////////////////////////////////////////////////

export async function getAddressInfoFromCChain(cChainAddress: string) {
  let balanceResult;

  await axios
    .post(
      process.env.C_CHAIN_BC_CLIENT_BLOCK_ENDPOINT,
      {
        jsonrpc: "2.0",
        id: 1,
        method: "eth_getBalance",
        params: [`${cChainAddress}`, "latest"],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
    .then((response) => {
      balanceResult = [0, (<any>response).data.result];
    })
    .catch((error) => {
      if (!error.response) {
        console.log("connection refused to avalanche client");
        balanceResult = [
          1,
          JSON.parse('{"result":"connection refused to avalanche client"}'),
        ];
      } else {
        console.log(error.response.data);
        balanceResult = [1, error.response.data];
      }
    });

  if (balanceResult[0] == 1) {
    return balanceResult;
  }

  const responseForTransactionCount = await axios.post(
    process.env.C_CHAIN_BC_CLIENT_BLOCK_ENDPOINT,
    {
      jsonrpc: "2.0",
      id: 1,
      method: "eth_getTransactionCount",
      params: [`${cChainAddress}`, "latest"],
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );

  return [
    web3.fromWei(`${balanceResult[1]}`, "ether"),
    parseInt((<any>responseForTransactionCount).data.result),
  ];
}
