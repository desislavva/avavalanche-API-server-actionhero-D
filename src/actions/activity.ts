import { Action } from "actionhero";

import * as activityInfo from "./../modules/activityInfo";

export class GetNetworkActivity extends Action {
  constructor() {
    super();
    this.name = "GetNetworkActivity";
    this.description =
      "I return information about Avalanche Network Activity. ";
    this.outputExample = {};
  }

  async run() {
    let response = await activityInfo.getNetworkActivity();
    return { response };
  }
}
