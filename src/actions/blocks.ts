import { Action } from "actionhero";
import * as cChain from '../modules/c-chain';

/// Block by hash ///
export class GetBlockByHash extends Action {

  constructor() {
    super();
    this.name = "GetBlockByHash";
    this.description = "I return information about Avalanche Block by hash";
    this.outputExample = {};
    this.inputs = {
      hash: { required: true }
    };
  }

  async run({ params }) {

    const block = await cChain.getBlockByHashFromCChain(params.hash);
    const response = block[1];
    return { response };
  }
}

/// Block by number ///
export class GetBlockByNumber extends Action {

  constructor() {
    super();
    this.name = "GetBlockByNumber";
    this.description = "I return information about Avalanche Block by number";
    this.outputExample = {};
    this.inputs = {
      blocknumber: { required: true }
    };
  }

  async run({ params }) {

    const block = await cChain.getBlockByNumberFromCChain(params.blocknumber);
    let response;

    if (block[0] == 1) {
      response = block[1];
    }
    else   {
      response = block[0];
    }

      return { response };
    }
  }


/// Get X Blocks after Nth ///
export class  GetXBlocksFromNthFromCChain extends Action {

    constructor() {
        super();
        this.name = "GetXBlocksFromNthFromCChain";
        this.description = "I return hash about Avalanche X Blocks after given Nth";
        this.outputExample = {};
        this.inputs = {
          blocknumber: { required: true },
          count: { required: true }
        };
      }
    
      async run({ params }) {
    
        const blocks = [];
        let response;
        let k = 0;
        const blockNumber = params.blocknumber;
        const count = params.count;

    for (let i = blockNumber - count; i < blockNumber; ++i)
    {
        let hashValue = await cChain.getBlockByNumberFromCChain(i.toString());
        
        if (hashValue[0] == 1) {
            response = hashValue[1];
            return { response };
        } 
            blocks[k] = hashValue[1];
            k++;
    }
    
    return { blocks };
  }
  
}
