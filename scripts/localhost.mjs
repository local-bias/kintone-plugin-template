//@ts-check

import express from 'express';
import { createServer } from 'https';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { certificateFor } from 'devcert';
import { join } from 'path';

const PORT = 1454;
const TEMPORARY_DIRECTORY = '.plugin';

const app = express();

app.use(express.static('dist'));

if (!existsSync(TEMPORARY_DIRECTORY)) {
  mkdirSync(TEMPORARY_DIRECTORY);
}

const keyPath = join(TEMPORARY_DIRECTORY, 'localhost-key.pem');
const certPath = join(TEMPORARY_DIRECTORY, 'localhost-cert.pem');

if (!existsSync(keyPath) || !existsSync(certPath)) {
  const { key, cert } = await certificateFor('localhost');

  console.log({ key, cert });

  writeFileSync(keyPath, key);
  writeFileSync(certPath, cert);
}

const privateKey = readFileSync(keyPath);
const certificate = readFileSync(certPath);

const server = createServer({ key: privateKey, cert: certificate }, app);

server.listen(PORT, () => {
  console.log(`Listening on https://localhost:${PORT}`);
});
