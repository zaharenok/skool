/**
 * SkAPI.pro API Credentials for n8n
 */

import {
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

export class SkapiApi implements ICredentialType {
  name = 'skapiApi';
  displayName = 'SkAPI.pro API';
  documentationUrl = 'https://chromewebstore.google.com/detail/skapipro/nibelkfckbgkoohibdbmalmkmhbfblaf';
  properties: INodeProperties[] = [
    {
      displayName: 'JWT Token',
      name: 'jwtToken',
      type: 'string',
      typeOptions: {
        password: true,
      },
      default: '',
      required: true,
      description: 'JWT token from SkAPI.pro Chrome Extension',
    },
    {
      displayName: 'Default Group URL or ID',
      name: 'defaultGroup',
      type: 'string',
      default: '',
      placeholder: 'ai-pays-my-bills-7018',
      description: 'Default Skool group to use when not specified in node. Can be overridden per operation.',
    },
    {
      displayName: 'Client ID (Optional)',
      name: 'clientId',
      type: 'string',
      default: '',
      description: 'Client ID for tracking (optional)',
    },
  ];
}
