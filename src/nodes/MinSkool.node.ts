/**
 * Minimal SkAPI.pro Node for n8n
 */

import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from "n8n-workflow";

export class MinSkoolNode implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Min Skool",
    name: "minSkool",
    icon: "fa:skool",
    group: ["transform"],
    version: 1,
    description: "Minimal test node",
    defaults: {
      name: "Min Skool",
    },
    inputs: ["main"],
    outputs: ["main"],
    properties: [],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    return [this.getInputData()];
  }
}
