import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import DataLoader from 'dataloader';

export class UserAPI extends RESTDataSource {
  constructor(baseUrl: string) {
    super();
    this.baseURL = baseUrl;
  }

  willSendRequest(request: RequestOptions) {
    // Can forward auth token for internal API calls
    request.headers.set('Authorization', this.context.authHeader);
    request.headers.set('Content-Type', 'application/json');
  }

  /*
   * This is an example of properly handling dataLoading with a REST data source
   * It is important to note that the REST endpoint should be able to handle filtering by multiple ids at once.
   * This reduces the amount of calls needed to load bulk resources.
   */
  private readonly userLoader = new DataLoader(async (idArr: any) => {
    const response = await this.get(`users?id=${[...idArr].join(',')}`);

    return idArr.map((id: any) =>
      response.content.find((obj: any) => obj.id.toString() === id.toString()),
    );
  });

  async loadUser(userId: string) {
    return this.userLoader.load(userId);
  }

  // USER RESOURCE
  async getUsers(paginationInput: any) {
    // Can handle parsing paginationInput into a query string to be used here...
    // const url = `/users${paginationInput}`;
    // const response = await this.get(url);
    return { data: [{
        'id': 1,
        'name': 'John Doe',
        'email': 'john.doe@test.com',
        'created': new Date(),
        'updated': new Date()
      }, {
        'id': 2,
        'name': 'Jane Doe',
        'email': 'jane.doe@test.com',
        'created': new Date(),
        'updated': new Date()
      }, {
        'id': 3,
        'name': 'Foo Bar',
        'email': 'foo.bar@test.com',
        'created': new Date(),
        'updated': new Date()
      }], paginationData: {} };
  }
}
