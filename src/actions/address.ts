import { Action } from "actionhero";

import * as cChain from "./../modules/c-chain";
import * as pChain from "./../modules/p-chain";
import * as xChain from "./../modules/x-chain";

const X_CHAIN = "X";
const P_CHAIN = "P";
const C_CHAIN = "0x";

export class GetAddressInfoByHash extends Action {
  constructor() {
    super();
    this.name = "GetAddressInfoByHash";
    this.description = "I return information about Avalanche Address by hash";
    this.outputExample = {};
    this.inputs = {
      hash: { required: true },
    };
  }

  async run({ params }) {
    let addressInfoFromXChain;
    let addressInfoFromCChain;
    let addressInfoFromPChain;
    let returnData;

    if (params.hash.charAt(0) == X_CHAIN) {
      addressInfoFromXChain = await xChain.getAddressInfoByHashFromXChain(
        params.hash
      );

      if (addressInfoFromXChain[0] == 1) {
        returnData = addressInfoFromXChain[1];

        return { returnData };
      } else {
        returnData = addressInfoFromXChain;

        return { returnData };
      }
    } else if (params.hash.charAt(0) == P_CHAIN) {
      addressInfoFromPChain = await pChain.getAddressInfoFromPChain(
        params.hash
      );

      if (addressInfoFromPChain[0] == 1) {
        returnData = addressInfoFromPChain[1];

        return { returnData };
      } else {
        returnData = addressInfoFromPChain[1];

        return { returnData };
      }
    } else if (params.hash.slice(0, 2) == C_CHAIN) {
      addressInfoFromCChain = await cChain.getAddressInfoFromCChain(
        params.hash
      );

      if (addressInfoFromCChain[0] == 1) {
        returnData = addressInfoFromCChain[1];

        return { returnData };
      } else {
        returnData = addressInfoFromCChain;

        return { returnData };
      }
    } else {
      return { result: "wrong input" };
    }
  }
}
