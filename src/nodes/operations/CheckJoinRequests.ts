/**
 * Check Join Requests Operation
 */

import {
  IExecuteFunctions,
} from 'n8n-workflow';

export async function checkJoinRequests(
  executeFunctions: IExecuteFunctions,
  jwtToken: string,
  clientId?: string
): Promise<any> {
  const group = executeFunctions.getNodeParameter('group', 0) as string;
  const limit = executeFunctions.getNodeParameter('limit', 0) as number;

  const response = await fetch('https://api.skapi.pro/check-join-requests', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      group: group,
      limit: limit || 20,
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
