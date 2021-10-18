export const DEFAULT = {
  routes: (config) => {
    return {
      get: [
        { path: "/status", action: "status" },
        { path: "/swagger", action: "swagger" },

        ////Activity////
        { path: "/activity", action: "GetNetworkActivity" },

        ////Blocks////
        { path: "/blocks/number/:blocknumber", action: "GetBlockByNumber" },
        { path: "/blocks/hash/:hash", action: "GetBlockByHash" },
        { path: "/blocks/numbers/:blocknumber/:count", action: "GetXBlocksFromNthFromCChain" },

        
        
      ],

    };
  },
};
