import { resolvers } from '../../../../src/graphQL/resolvers';

describe('Query getUser', () => {
  test('Calls proper dataSource', async () => {
    // @ts-ignore
    const res = await resolvers.Query.getUser({}, {
      userId: 1
    }, {
      dataSources: {
        userDB: {
          getUserById: (userId: string) => {
            return true;
          }
        }
      }
    });
    await expect(res).toBe(true);
  });
});
