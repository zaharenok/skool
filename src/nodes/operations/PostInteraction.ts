/**
 * Post Interaction Operation
 * Actions: like, unlike, get_likes
 */

import {
  IExecuteFunctions,
} from 'n8n-workflow';

export async function postInteraction(
  executeFunctions: IExecuteFunctions,
  jwtToken: string,
  clientId?: string
): Promise<any> {
  const group = executeFunctions.getNodeParameter('group', 0) as string;
  const postId = executeFunctions.getNodeParameter('postId', 0) as string;
  const action = executeFunctions.getNodeParameter('action', 0) as string;

  const response = await executeFunctions.helpers.httpRequest({
    method: 'POST',
    url: 'https://skoolpublikgroupchecker-production.up.railway.app/post-interaction',
    headers: { 'Content-Type': 'application/json' },
    body: {
      group,
      post_id: postId,
      action,
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
