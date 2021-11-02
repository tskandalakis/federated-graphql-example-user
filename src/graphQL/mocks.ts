import { buildFederatedSchema } from '@apollo/federation';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';

export const mocks = {
  _Service: () => ({
    'sdl': buildFederatedSchema([{ typeDefs, resolvers }])
  })
};