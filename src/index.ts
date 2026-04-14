import { createServer } from 'node:http';

import { app } from './app.js';

const port = Number(process.env.PORT) || 3000;

const server = createServer(app);

server.listen(port, () => {
  process.stdout.write(`Server listening on http://localhost:${port}\n`);
});
