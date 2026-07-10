/**
 * Minimal Credentials for n8n
 */

import {
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

export class MinSkoolCredentials implements ICredentialType {
  name = 'minSkool';
  displayName = 'Min Skool';
  properties: INodeProperties[] = [
    {
      displayName: 'API Key',
      name: 'apiKey',
      type: 'string',
      default: '',
    },
  ];
}
