/**
 * Test Skool Node - Minimal Working Example
 */
import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from "n8n-workflow";

export class TestSkoolNode implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Test Skool",
    name: "testSkool",
    icon: "fa:test",
    group: ["transform"],
    version: 1,
    description: "Test node for debugging",
    defaults: {
      name: "Test Skool",
    },
    inputs: ["main"],
    outputs: ["main"],
    credentials: [],
    properties: [],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    return [this.getInputData()];
  }
}
