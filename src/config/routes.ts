export const DEFAULT = {
  routes: (config) => {
    return {
      get: [
        { path: "/status", action: "status" },
        { path: "/swagger", action: "swagger" },

        ////Activity////
        { path: "/network", action: "GetNetworkActivity" },

        ////Blocks////
        { path: "/blocks/number/:blocknumber", action: "GetBlockByNumber" },
        { path: "/blocks/hash/:hash", action: "GetBlockByHash" },
        {
          path: "/blocks/numbers/:blocknumber/:count",
          action: "GetXBlocksFromNthFromCChain",
        },

        ////Transactions////
        { path: "/transactions/hash/:hash", action: "GetTransactionByHash" },
        {
          path: "/transactions/:address/:n/:x",
          action: "GetXTransactionsAfterNthFromAddress",
        },
        {
          path: "/transactions/:n/:x",
          action: "GetXPendingTransactionsAfterNth",
        },
        {
          path: "/transactions/recentxchain",
          action: "GetRecentTransactionsFromXChain",
        },
        {
          path: "/transactions/recentpchain",
          action: "GetRecentTransactionsFromPChain",
        },

        ////Address////
        { path: "/address/hash/:hash", action: "GetAddressInfoByHash" },
      ],
    };
  },
};
