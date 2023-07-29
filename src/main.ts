import 'dotenv/config';

import { Server } from '@src/server';

(async () => {
  const server = new Server();
  await server.setup();
  await server.start();
})();
