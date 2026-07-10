/**
 * Skool API (Skapi.pro) Node for n8n
 * Automate Skool communities
 */

import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  NodeConnectionTypes,
} from 'n8n-workflow';

import { checkJoinRequests } from './operations/CheckJoinRequests';
import { processJoinRequest } from './operations/ProcessJoinRequest';
import { checkMessages } from './operations/CheckMessages';
import { checkNotifications } from './operations/CheckNotifications';
import { sendWelcomeMessage } from './operations/SendWelcomeMessage';

export class SkapiPro implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Skool API (Skapi.pro)',
    name: 'skapiPro',
    icon: {
      light: 'file:skapi.svg',
      dark: 'file:skapi.dark.svg',
    },
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"]}}',
    description: 'Automate Skool communities — manage join requests, messages and notifications',
    defaults: {
      name: 'Skool API',
    },
    inputs: [NodeConnectionTypes.Main],
    outputs: [NodeConnectionTypes.Main],
    credentials: [
      {
        name: 'skapiApi',
        required: true,
      },
    ],
    properties: [
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        options: [
          {
            name: 'Join Request',
            value: 'joinRequest',
            description: 'Manage join requests',
          },
          {
            name: 'Message',
            value: 'message',
            description: 'Check and manage messages',
          },
          {
            name: 'Notification',
            value: 'notification',
            description: 'Check Skool notifications',
          },
        ],
        default: 'joinRequest',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        displayOptions: {
          show: {
            resource: ['joinRequest'],
          },
        },
        options: [
          {
            name: 'Check Join Requests',
            value: 'checkJoinRequests',
            description: 'Get pending join requests',
            action: 'Get join requests',
          },
          {
            name: 'Process Join Request',
            value: 'processJoinRequest',
            description: 'Approve or decline join request',
            action: 'Process join request',
          },
          {
            name: 'Send Welcome Message',
            value: 'sendWelcomeMessage',
            description: 'Send welcome message to new member',
            action: 'Send welcome message',
          },
        ],
        default: 'checkJoinRequests',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        displayOptions: {
          show: {
            resource: ['message'],
          },
        },
        options: [
          {
            name: 'Check Messages',
            value: 'checkMessages',
            description: 'Get new messages in group',
            action: 'Get messages',
          },
        ],
        default: 'checkMessages',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        displayOptions: {
          show: {
            resource: ['notification'],
          },
        },
        options: [
          {
            name: 'Check Notifications',
            value: 'checkNotifications',
            description: 'Get Skool notifications',
            action: 'Get notifications',
          },
        ],
        default: 'checkNotifications',
      },
      {
        displayName: 'Group URL or ID',
        name: 'group',
        type: 'string',
        displayOptions: {
          show: {
            operation: ['checkJoinRequests', 'processJoinRequest', 'sendWelcomeMessage', 'checkMessages'],
          },
        },
        required: true,
        default: '',
        placeholder: 'ai-pays-my-bills-7018',
        description: 'Skool group URL or ID',
      },
      {
        displayName: 'Action',
        name: 'action',
        type: 'options',
        displayOptions: {
          show: {
            operation: ['processJoinRequest'],
          },
        },
        options: [
          {
            name: 'Approve',
            value: 'approve',
          },
          {
            name: 'Decline',
            value: 'decline',
          },
        ],
        default: 'approve',
      },
      {
        displayName: 'Search By',
        name: 'searchBy',
        type: 'options',
        displayOptions: {
          show: {
            operation: ['processJoinRequest'],
          },
        },
        options: [
          {
            name: 'Name',
            value: 'name',
          },
          {
            name: 'Email',
            value: 'email',
          },
          {
            name: 'Profile URL',
            value: 'profile_url',
          },
        ],
        default: 'name',
      },
      {
        displayName: 'Search Value',
        name: 'searchValue',
        type: 'string',
        displayOptions: {
          show: {
            operation: ['processJoinRequest'],
          },
        },
        required: true,
        default: '',
        placeholder: 'John Doe',
      },
      {
        displayName: 'Welcome Message',
        name: 'welcomeMessage',
        type: 'string',
        displayOptions: {
          show: {
            operation: ['sendWelcomeMessage'],
          },
        },
        required: false,
        default: 'Welcome to our community! 🎉',
        description: 'Message to send to new member',
        typeOptions: {
          rows: 4,
        },
      },
      {
        displayName: 'Limit',
        name: 'limit',
        type: 'number',
        displayOptions: {
          show: {
            operation: ['checkJoinRequests', 'checkMessages'],
          },
        },
        default: 20,
        description: 'Maximum number of results',
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    const resource = this.getNodeParameter('resource', 0) as string;
    const operation = this.getNodeParameter('operation', 0) as string;
    const credentials = await this.getCredentials('skapiApi');

    if (!credentials || !credentials.jwtToken) {
      throw new Error('No valid credentials found');
    }

    const jwtToken = credentials.jwtToken as string;
    const clientId = credentials.clientId as string | undefined;

    let result;

    switch (resource) {
      case 'joinRequest':
        switch (operation) {
          case 'checkJoinRequests':
            result = await checkJoinRequests(this, jwtToken, clientId);
            break;
          case 'processJoinRequest':
            result = await processJoinRequest(this, jwtToken, clientId);
            break;
          case 'sendWelcomeMessage':
            result = await sendWelcomeMessage(this, jwtToken, clientId);
            break;
          default:
            throw new Error(`Unknown operation: ${operation}`);
        }
        break;

      case 'message':
        switch (operation) {
          case 'checkMessages':
            result = await checkMessages(this, jwtToken, clientId);
            break;
          default:
            throw new Error(`Unknown operation: ${operation}`);
        }
        break;

      case 'notification':
        switch (operation) {
          case 'checkNotifications':
            result = await checkNotifications(this, jwtToken, clientId);
            break;
          default:
            throw new Error(`Unknown operation: ${operation}`);
        }
        break;

      default:
        throw new Error(`Unknown resource: ${resource}`);
    }

    if (Array.isArray(result)) {
      returnData.push(...result.map(item => ({ json: item })));
    } else {
      returnData.push({ json: result });
    }

    return [returnData];
  }
}
