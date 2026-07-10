/**
 * Check Join Requests Operation
 */

import {
  IExecuteFunctions,
} from 'n8n-workflow';

export async function checkJoinRequests(
  executeFunctions: IExecuteFunctions,
  jwtToken: string,
  clientId?: string,
  defaultGroup?: string
): Promise<any> {
  const group = (executeFunctions.getNodeParameter('group', 0) as string) || defaultGroup || '';
  const limit = executeFunctions.getNodeParameter('limit', 0) as number;

  const response = await executeFunctions.helpers.httpRequest({
    method: 'POST',
    url: 'https://api.skapi.pro/check-join-requests',
    headers: { 'Content-Type': 'application/json' },
    body: {
      group: group,
      limit: limit || 20,
      jwt_token: jwtToken,
      client_id: clientId,
    },
    json: true,
  });

  if (response.detail) {
    throw new Error(typeof response.detail === 'string' ? response.detail : JSON.stringify(response.detail));
  }

  const data: any = response.join_requests || response;
  data.pending_count = response.join_requests?.has_requests
    ? parseInt(response.join_requests.count_text || '0', 10)
    : 0;
  data.users = response.join_requests?.users_data || (response as any).users || [];

  return data;
}
