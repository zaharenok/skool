/**
 * Process Join Request Operation
 */

import {
  IExecuteFunctions,
} from 'n8n-workflow';

export async function processJoinRequest(
  executeFunctions: IExecuteFunctions,
  jwtToken: string,
  clientId?: string
): Promise<any> {
  const group = executeFunctions.getNodeParameter('group', 0) as string;
  const action = executeFunctions.getNodeParameter('action', 0) as string;
  const searchBy = executeFunctions.getNodeParameter('searchBy', 0) as string;
  const searchValue = executeFunctions.getNodeParameter('searchValue', 0) as string;

  const response = await fetch('https://api.skapi.pro/process-join-request', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      group: group,
      action: action,
      [searchBy]: searchValue,
      jwt_token: jwtToken,
      client_id: clientId,
    }),
  });

  const data = await response.json() as any;

  if (response.ok && data.success) {
    return data.result;
  }

  throw new Error(`API Error: ${data.detail || data.error || response.statusText}`);
}
