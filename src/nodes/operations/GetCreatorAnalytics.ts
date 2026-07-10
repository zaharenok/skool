/**
 * Get Creator Analytics Operation
 */

import {
  IExecuteFunctions,
} from 'n8n-workflow';

export async function getCreatorAnalytics(
  executeFunctions: IExecuteFunctions,
  jwtToken: string,
  clientId?: string
): Promise<any> {
  const group = executeFunctions.getNodeParameter('group', 0) as string;

  const body: any = {
    jwt_token: jwtToken,
    client_id: clientId,
  };

  if (group) {
    body.group = group;
  }

  const response = await executeFunctions.helpers.httpRequest({
    method: 'POST',
    url: 'https://api.skapi.pro/creator-analytics',
    headers: { 'Content-Type': 'application/json' },
    body,
    json: true,
  });

  if (response.success) {
    return response;
  }

  throw new Error(`API Error: ${response.error || 'Unknown error'}`);
}
