import * as dotenv from "dotenv";

dotenv.config();

import * as cChainMethods from "./../modules/c-chain";
import * as xChainMethods from "./../modules/x-chain";
import * as pChainMethods from "./../modules/p-chain";

const X_CHAIN = "X";
const P_CHAIN = "P";
const C_CHAIN = "0x";

//GET address info by hash
export async function getAddressInfoByHash(hash: string) {
  let addressInfoFromXChain;
  let addressInfoFromCChain;
  let addressInfoFromPChain;

  if (hash.charAt(0) == X_CHAIN) {
    addressInfoFromXChain = await xChainMethods.getAddressInfoByHashFromXChain(
      hash
    );

    if (addressInfoFromXChain[0] == 1) {
      return JSON.stringify(addressInfoFromXChain[1]);
    }
    return JSON.stringify(addressInfoFromXChain);
  } else if (hash.charAt(0) == P_CHAIN) {
    addressInfoFromPChain = await pChainMethods.getAddressInfoFromPChain(hash);

    if (addressInfoFromPChain[0] == 1) {
      return JSON.stringify(addressInfoFromPChain[1]);
    }
    return JSON.stringify(addressInfoFromPChain[1]);
  } else if (hash.slice(0, 2) == C_CHAIN) {
    addressInfoFromCChain = await cChainMethods.getAddressInfoFromCChain(hash);

    if (addressInfoFromCChain[0] == 1) {
      return JSON.stringify(addressInfoFromCChain[1]);
    }
    return JSON.stringify(addressInfoFromCChain);
  } else {
    return JSON.stringify("result: wrong input");
  }
}
