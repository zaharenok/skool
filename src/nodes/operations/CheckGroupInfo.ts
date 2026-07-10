/**
 * Check Group Info Operation
 * No authentication required
 */

import {
  IExecuteFunctions,
} from 'n8n-workflow';

export async function checkGroupInfo(
  executeFunctions: IExecuteFunctions,
  jwtToken?: string,
  clientId?: string
): Promise<any> {
  const group = executeFunctions.getNodeParameter('group', 0) as string;

  const response = await executeFunctions.helpers.httpRequest({
    method: 'POST',
    url: 'https://api.skapi.pro/check-group',
    headers: { 'Content-Type': 'application/json' },
    body: {
      group: group,
    },
    json: true,
  });

  if (response.result) {
    response.result.members_count_num = parseInt(response.result.members_count || '0', 10);
  }

  return response;
}
