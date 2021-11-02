'use strict';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildFederatedSchema } from '@apollo/federation';
import promBundle from 'express-prom-bundle';
import { UserAPI } from '../datasources/UserAPI';
import { UserDB } from '../datasources/UserDB';
import { typeDefs } from '../graphQL/schema';
import { resolvers } from '../graphQL/resolvers';
import { LoggingPlugin } from './LoggingPlugin';

export async function init(config: any): Promise<Express.Application> {
  try {
    const app = express();

    // metrics
    app.use(promBundle({
      includePath: true,
      includeMethod: false,
      includeStatusCode: true,
      customLabels: { query: ''},
      transformLabels: (labels, req, res) => {
        labels.query = (req.body && req.body.query) ? req.body.query.match(/([A-Za-z])\w+/g)[0] : '';
        return labels;
      }
    }));

    // apollo federated server
    const schema = buildFederatedSchema([{ typeDefs, resolvers }]);
    const server = new ApolloServer({
      context: ({ req }) => {

        return {
          timer: process.hrtime()
        };
      },
      dataSources: () => {
        return {
          userAPI: new UserAPI('https://someApi'),
          userDB: new UserDB(),
        };
      },
      plugins: [LoggingPlugin],
      schema,
      introspection: false,
    });

    await server.start();
    server.applyMiddleware({ app, path: config.path });

    app.listen(config.port, () => {
      console.info(`Node Express server listening on http://localhost:${config.port}${server.graphqlPath}`);
    });

    return app;
  } catch (err) {
    console.info('error starting server');
    throw err;
  }
}
