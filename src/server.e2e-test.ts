import request from 'supertest';

import { Server } from '@src/server';

describe('Server:', () => {
  let serverInstance: Server;

  beforeAll(async () => {
    serverInstance = new Server();

    await serverInstance.setup();
    await serverInstance.start();
  });

  afterAll(async () => {
    serverInstance.httpServer.close();
  });

  it('(GET) /', async () => {
    const response = await request(serverInstance.expressApp).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Hello World' });
  });

  it('(GET) /:name', async () => {
    const response = await request(serverInstance.expressApp).get('/John');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Hello John' });
  });
});
