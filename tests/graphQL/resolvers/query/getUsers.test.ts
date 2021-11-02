import { resolvers } from '../../../../src/graphQL/resolvers';

describe('Query getUsers', () => {
  test('Calls proper dataSource', async () => {
    // @ts-ignore
    const res = await resolvers.Query.getUsers({}, {
      paginationInput: null
    }, {
      dataSources: {
        userAPI: {
          getUsers: (idArr: string[]) => {
            return true;
          }
        }
      }
    });
    await expect(res).toBe(true);
  });
});
