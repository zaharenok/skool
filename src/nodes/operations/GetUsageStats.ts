/**
 * Get Usage Stats Operation
 * GET /rate-limit/stats — shows monthly quota and usage
 */

import {
  IExecuteFunctions,
} from 'n8n-workflow';

export async function getUsageStats(
  executeFunctions: IExecuteFunctions,
  jwtToken: string,
  clientId?: string
): Promise<any> {
  const response = await executeFunctions.helpers.httpRequest({
    method: 'GET',
    url: 'http://api.skapi.pro/rate-limit/stats?jwt_token=' + encodeURIComponent(jwtToken),
    headers: {
      'X-JWT-Token': jwtToken,
      'X-Client-ID': clientId || 'n8n-node',
    },
    json: true,
  });

  return response;
}
