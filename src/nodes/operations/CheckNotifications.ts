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
  const response = await fetch('https://api.skapi.pro/check-notifications', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
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
