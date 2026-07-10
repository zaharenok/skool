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
import { checkGroupInfo } from './operations/CheckGroupInfo';
import { getGroupPosts } from './operations/GetGroupPosts';
import { searchPosts } from './operations/SearchPosts';
import { getTrendingPosts } from './operations/GetTrendingPosts';
import { getPostComments } from './operations/GetPostComments';
import { getGroupMembers } from './operations/GetGroupMembers';
import { getCreatorAnalytics } from './operations/GetCreatorAnalytics';
import { postInteraction } from './operations/PostInteraction';

export class SkapiPro implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Skool API (Skapi.pro)',
    name: 'skapiPro',
    icon: {
      light: 'file:skapi.png',
      dark: 'file:skapi.dark.png',
    },
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
    description: 'Automate Skool communities — manage join requests, messages, posts, members and more',
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
      // ===== RESOURCE SELECTOR =====
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        options: [
          { name: 'Join Request', value: 'joinRequest', description: 'Manage join requests' },
          { name: 'Message', value: 'message', description: 'Check messages' },
          { name: 'Notification', value: 'notification', description: 'Check notifications' },
          { name: 'Group Info', value: 'groupInfo', description: 'Get public group info' },
          { name: 'Post', value: 'post', description: 'View and search posts' },
          { name: 'Member', value: 'member', description: 'View group members' },
          { name: 'Analytics', value: 'analytics', description: 'Creator analytics' },
          { name: 'Interaction', value: 'interaction', description: 'Like/unlike posts' },
        ],
        default: 'joinRequest',
      },

      // ===== JOIN REQUEST OPERATIONS =====
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        displayOptions: { show: { resource: ['joinRequest'] } },
        options: [
          { name: 'Check Join Requests', value: 'checkJoinRequests', description: 'Get pending join requests', action: 'Get join requests' },
          { name: 'Process Join Request', value: 'processJoinRequest', description: 'Approve or decline join request', action: 'Process join request' },
          { name: 'Send Welcome Message', value: 'sendWelcomeMessage', description: 'Send welcome message to new member', action: 'Send welcome message' },
        ],
        default: 'checkJoinRequests',
      },

      // ===== MESSAGE OPERATIONS =====
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        displayOptions: { show: { resource: ['message'] } },
        options: [
          { name: 'Check Messages', value: 'checkMessages', description: 'Get new messages in group', action: 'Get messages' },
        ],
        default: 'checkMessages',
      },

      // ===== NOTIFICATION OPERATIONS =====
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        displayOptions: { show: { resource: ['notification'] } },
        options: [
          { name: 'Check Notifications', value: 'checkNotifications', description: 'Get Skool notifications', action: 'Get notifications' },
        ],
        default: 'checkNotifications',
      },

      // ===== GROUP INFO OPERATIONS =====
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        displayOptions: { show: { resource: ['groupInfo'] } },
        options: [
          { name: 'Check Group Info', value: 'checkGroupInfo', description: 'Get public group details (no auth required)', action: 'Check group info' },
        ],
        default: 'checkGroupInfo',
      },

      // ===== POST OPERATIONS =====
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        displayOptions: { show: { resource: ['post'] } },
        options: [
          { name: 'Get Posts', value: 'getGroupPosts', description: 'Get posts from a group', action: 'Get posts' },
          { name: 'Search Posts', value: 'searchPosts', description: 'Search posts in a group', action: 'Search posts' },
          { name: 'Get Trending Posts', value: 'getTrendingPosts', description: 'Get trending posts', action: 'Get trending' },
          { name: 'Get Post Comments', value: 'getPostComments', description: 'Get comments on a post', action: 'Get comments' },
        ],
        default: 'getGroupPosts',
      },

      // ===== MEMBER OPERATIONS =====
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        displayOptions: { show: { resource: ['member'] } },
        options: [
          { name: 'Get Members', value: 'getGroupMembers', description: 'Get members of a group', action: 'Get members' },
        ],
        default: 'getGroupMembers',
      },

      // ===== ANALYTICS OPERATIONS =====
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        displayOptions: { show: { resource: ['analytics'] } },
        options: [
          { name: 'Get Creator Analytics', value: 'getCreatorAnalytics', description: 'Get analytics for your creator account', action: 'Get analytics' },
        ],
        default: 'getCreatorAnalytics',
      },

      // ===== INTERACTION OPERATIONS =====
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        displayOptions: { show: { resource: ['interaction'] } },
        options: [
          { name: 'Post Interaction', value: 'postInteraction', description: 'Like, unlike, or get likes on a post', action: 'Post interaction' },
        ],
        default: 'postInteraction',
      },

      // ===== SHARED PARAMETERS =====

      // Group URL or ID
      {
        displayName: 'Group URL or ID',
        name: 'group',
        type: 'string',
        displayOptions: {
          show: {
            operation: ['checkJoinRequests', 'processJoinRequest', 'sendWelcomeMessage', 'checkMessages',
              'checkGroupInfo', 'getGroupPosts', 'searchPosts', 'getTrendingPosts', 'getPostComments',
              'getGroupMembers'],
          },
        },
        required: true,
        default: '',
        placeholder: 'ai-pays-my-bills-7018',
        description: 'Skool group URL, ID, or name',
      },

      // Query (search)
      {
        displayName: 'Search Query',
        name: 'query',
        type: 'string',
        displayOptions: { show: { operation: ['searchPosts'] } },
        required: true,
        default: '',
        placeholder: 'search term',
        description: 'Search term to find posts',
      },

      // Post ID
      {
        displayName: 'Post ID or URL',
        name: 'postId',
        type: 'string',
        displayOptions: { show: { operation: ['getPostComments', 'postInteraction'] } },
        required: true,
        default: '',
        placeholder: 'Post ID or full post URL',
        description: 'Post ID or full URL of the post',
      },

      // Analytics group filter (optional)
      {
        displayName: 'Group Filter (optional)',
        name: 'group',
        type: 'string',
        displayOptions: { show: { operation: ['getCreatorAnalytics'] } },
        required: false,
        default: '',
        placeholder: 'ai-pays-my-bills-7018',
        description: 'Filter analytics by specific group',
      },

      // Interaction action
      {
        displayName: 'Action',
        name: 'action',
        type: 'options',
        displayOptions: { show: { operation: ['processJoinRequest', 'postInteraction'] } },
        options: [
          { name: 'Approve', value: 'approve' },
          { name: 'Decline', value: 'decline' },
          { name: 'Like', value: 'like' },
          { name: 'Unlike', value: 'unlike' },
          { name: 'Get Likes', value: 'get_likes' },
        ],
        default: 'approve',
      },

      // Search By
      {
        displayName: 'Search By',
        name: 'searchBy',
        type: 'options',
        displayOptions: { show: { operation: ['processJoinRequest'] } },
        options: [
          { name: 'Name', value: 'name' },
          { name: 'Email', value: 'email' },
          { name: 'Profile URL', value: 'profile_url' },
        ],
        default: 'name',
      },

      // Search Value
      {
        displayName: 'Search Value',
        name: 'searchValue',
        type: 'string',
        displayOptions: { show: { operation: ['processJoinRequest'] } },
        required: true,
        default: '',
        placeholder: 'John Doe',
      },

      // Welcome Message
      {
        displayName: 'Welcome Message',
        name: 'welcomeMessage',
        type: 'string',
        displayOptions: { show: { operation: ['sendWelcomeMessage'] } },
        required: false,
        default: 'Welcome to our community! 🎉',
        description: 'Message to send to new member',
        typeOptions: { rows: 4 },
      },

      // Limit
      {
        displayName: 'Limit',
        name: 'limit',
        type: 'number',
        displayOptions: { show: { operation: ['checkJoinRequests', 'checkMessages', 'getGroupPosts',
          'searchPosts', 'getTrendingPosts', 'getPostComments', 'getGroupMembers'] } },
        default: 20,
        description: 'Maximum number of results',
      },

      // Offset
      {
        displayName: 'Offset',
        name: 'offset',
        type: 'number',
        displayOptions: { show: { operation: ['getGroupPosts', 'getGroupMembers'] } },
        default: 0,
        description: 'Number of results to skip (for pagination)',
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    const resource = this.getNodeParameter('resource', 0) as string;
    const operation = this.getNodeParameter('operation', 0) as string;

    let jwtToken = '';
    let clientId: string | undefined;

    // Group Info doesn't need auth; others do
    if (resource !== 'groupInfo') {
      const credentials = await this.getCredentials('skapiApi');
      if (!credentials || !credentials.jwtToken) {
        throw new Error('No valid credentials found');
      }
      jwtToken = credentials.jwtToken as string;
      clientId = credentials.clientId as string | undefined;
    }

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

      case 'groupInfo':
        switch (operation) {
          case 'checkGroupInfo':
            result = await checkGroupInfo(this, jwtToken, clientId);
            break;
          default:
            throw new Error(`Unknown operation: ${operation}`);
        }
        break;

      case 'post':
        switch (operation) {
          case 'getGroupPosts':
            result = await getGroupPosts(this, jwtToken, clientId);
            break;
          case 'searchPosts':
            result = await searchPosts(this, jwtToken, clientId);
            break;
          case 'getTrendingPosts':
            result = await getTrendingPosts(this, jwtToken, clientId);
            break;
          case 'getPostComments':
            result = await getPostComments(this, jwtToken, clientId);
            break;
          default:
            throw new Error(`Unknown operation: ${operation}`);
        }
        break;

      case 'member':
        switch (operation) {
          case 'getGroupMembers':
            result = await getGroupMembers(this, jwtToken, clientId);
            break;
          default:
            throw new Error(`Unknown operation: ${operation}`);
        }
        break;

      case 'analytics':
        switch (operation) {
          case 'getCreatorAnalytics':
            result = await getCreatorAnalytics(this, jwtToken, clientId);
            break;
          default:
            throw new Error(`Unknown operation: ${operation}`);
        }
        break;

      case 'interaction':
        switch (operation) {
          case 'postInteraction':
            result = await postInteraction(this, jwtToken, clientId);
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
