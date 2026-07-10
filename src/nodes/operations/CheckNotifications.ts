/**
 * Check Notifications Operation
 */

import {
  IExecuteFunctions,
} from 'n8n-workflow';

export async function checkNotifications(
  executeFunctions: IExecuteFunctions,
  jwtToken: string,
  clientId?: string
): Promise<any> {
  const response = await executeFunctions.helpers.httpRequest({
    method: 'POST',
    url: 'https://api.skapi.pro/check-notifications',
    headers: { 'Content-Type': 'application/json' },
    body: {
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
