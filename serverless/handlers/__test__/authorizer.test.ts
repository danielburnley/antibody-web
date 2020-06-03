import { handler } from '../authorizer/handler';
import { resolve } from 'path';
//import createEvent from '@serverless/event-mocks';

require('dotenv').config({ path: resolve(__dirname,"../../test.env") });

describe('authorizer', () => {


  it('should throw an error if no token is supplied', async () => {
    const event = { authorizationToken: undefined } as any;
    await expect(handler(event)).rejects.toThrowError("Unauthorized");
  });
});
