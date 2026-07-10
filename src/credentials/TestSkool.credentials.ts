/**
 * Test Credentials - Empty Implementation
 */
import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class TestSkoolCredentials implements ICredentialType {
  name = 'testSkool';
  displayName = 'Test Skool';
  properties: INodeProperties[] = [];
}
