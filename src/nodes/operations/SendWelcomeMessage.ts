/**
 * Send Welcome Message Operation
 *
 * NOTE: This operation requires the API endpoint to be implemented first
 * in the main SkAPI.pro project
 */

import {
  IExecuteFunctions,
} from 'n8n-workflow';

export async function sendWelcomeMessage(
  executeFunctions: IExecuteFunctions,
  jwtToken: string,
  clientId?: string
): Promise<any> {
  const group = executeFunctions.getNodeParameter('group', 0) as string;
  const message = executeFunctions.getNodeParameter('welcomeMessage', 0) as string;

  const inputData = executeFunctions.getInputData();
  const userName = inputData[0]?.json?.name || '';

  if (!userName) {
    throw new Error('No user name found. Please connect to a Check Join Requests node first.');
  }

  return {
    success: true,
    message: 'Welcome message feature coming soon!',
    data: {
      group: group,
      user: userName,
      message: message,
    },
  };
}
