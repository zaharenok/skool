/**
 * Get Trending Posts Operation
 */

import {
  IExecuteFunctions,
} from 'n8n-workflow';

export async function getTrendingPosts(
  executeFunctions: IExecuteFunctions,
  jwtToken: string,
  clientId?: string
): Promise<any> {
  const group = executeFunctions.getNodeParameter('group', 0) as string;
  const limit = executeFunctions.getNodeParameter('limit', 0) as number;

  const response = await executeFunctions.helpers.httpRequest({
    method: 'POST',
    url: 'http://api.skapi.pro/group-posts/trending',
    headers: { 'Content-Type': 'application/json' },
    body: {
      group,
      limit: limit || 20,
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
