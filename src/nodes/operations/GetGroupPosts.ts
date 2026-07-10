/**
 * Get Group Posts Operation
 */

import {
  IExecuteFunctions,
} from 'n8n-workflow';

export async function getGroupPosts(
  executeFunctions: IExecuteFunctions,
  jwtToken: string,
  clientId?: string
): Promise<any> {
  const group = executeFunctions.getNodeParameter('group', 0) as string;
  const limit = executeFunctions.getNodeParameter('limit', 0) as number;
  const offset = executeFunctions.getNodeParameter('offset', 0) as number;

  const response = await executeFunctions.helpers.httpRequest({
    method: 'POST',
    url: 'https://api.skapi.pro/group-posts',
    headers: { 'Content-Type': 'application/json' },
    body: {
      group,
      limit: limit || 20,
      offset: offset || 0,
      jwt_token: jwtToken,
      client_id: clientId,
    },
    json: true,
  });

  if (response.success) {
    return response;
  }

  throw new Error(`API Error: ${response.error || 'Unknown error'}`);
}
