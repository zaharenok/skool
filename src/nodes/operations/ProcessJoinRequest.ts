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

  const response = await executeFunctions.helpers.httpRequest({
    method: 'POST',
    url: 'https://skoolpublikgroupchecker-production.up.railway.app/process-join-request',
    headers: { 'Content-Type': 'application/json' },
    body: {
      group: group,
      action: action,
      [searchBy]: searchValue,
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
