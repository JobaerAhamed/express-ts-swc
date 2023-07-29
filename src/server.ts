import express from 'express';
import { info } from 'node:console';
import type { Server as HttpServer } from 'node:http';

import { SayHello } from '@src/service';
export class Server {
  expressApp: express.Express;
  httpServer: HttpServer;

  constructor() {
    this.expressApp = express();
  }

  async setup() {
    this.expressApp.use(express.json(), express.urlencoded({ extended: true }));

    // controllers
    this.expressApp.get('/', (req, res) => {
      res.status(200).json(SayHello('World'));
    });

    this.expressApp.get('/:name', (req, res) => {
      res.status(200).json(SayHello(req.params.name));
    });
  }

  async start() {
    const { PORT = 8080 } = process.env;
    this.httpServer = this.expressApp.listen(PORT, () => {
      info(`Server listening on http://localhost:${PORT}`);
    });
  }
}
