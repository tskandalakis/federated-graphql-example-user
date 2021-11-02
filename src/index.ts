
'use strict';
import * as Server from './core/server';
import fs from 'fs';
import { Config } from './configurations';

// Catch unhandled unexpected exceptions
process.on('uncaughtException', (error: Error) => {
  console.info(`uncaughtException ${error.message}`);
});

// Catch unhandled rejected promises
process.on('unhandledRejection', (reason: any) => {
  console.info(`unhandledRejection ${reason}`);
});

console.info(`Running environment ${process.env.CLUSTER_NAME || 'default'}`);

const config = Config.config().get();

const app = Server.init(config);