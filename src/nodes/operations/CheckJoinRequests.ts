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

  const response = await executeFunctions.helpers.httpRequest({
    method: 'POST',
    url: 'https://skoolpublikgroupchecker-production.up.railway.app/check-join-requests',
    headers: { 'Content-Type': 'application/json' },
    body: {
      group: group,
      limit: limit || 20,
      jwt_token: jwtToken,
      client_id: clientId,
    },
    json: true,
  });

  if (response.success) {
    return response.result;
  }

  throw new Error(`API Error: ${response.error || response.detail || 'Unknown error'}`);
}
