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
  documentationUrl = 'https://www.skool.com/ai-pays-my-bills-7018/about';
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
      description: 'Install SkAPI.pro Chrome Extension (link below ↓), open its popup, and copy your JWT token.',
    },
    {
      displayName: '💡 How to get JWT Token',
      name: 'jwtHint',
      type: 'notice',
      default: '1. Install extension: https://chromewebstore.google.com/detail/skapipro/nibelkfckbgkoohibdbmalmkmhbfblaf\n2. Open extension popup in Chrome\n3. Copy your JWT token\n4. Paste above ↑\n\nNeed help? Join: https://www.skool.com/ai-pays-my-bills-7018/about',
    },
    {
      displayName: 'Default Group URL or ID',
      name: 'defaultGroup',
      type: 'string',
      default: '',
      placeholder: 'ai-pays-my-bills-7018',
      description: 'Default Skool group. Can be overridden per node operation.',
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
