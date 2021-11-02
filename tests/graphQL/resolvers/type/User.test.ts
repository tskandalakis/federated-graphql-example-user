import { resolvers } from '../../../../src/graphQL/resolvers';

describe('User', () => {
  test('__resolveReference', async () => {
    // @ts-ignore
    const res = await resolvers.User.__resolveReference({
      id: 1
    }, {
      dataSources: {
        userDB: {
          loadUser: (id: number) => {
            return {
              id,
              name: 'test'
            };
          }
        }
      }
    });
    await expect(res).toEqual({id: 1, name: 'test'});
  });
});
