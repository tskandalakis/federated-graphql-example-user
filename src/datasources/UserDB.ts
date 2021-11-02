import { DataSource } from 'apollo-datasource';
import DataLoader from 'dataloader';
import {ApolloError} from 'apollo-server-express'

interface User {
  id: number
  name: string
  email: string
  created: Date
  updated: Date
}

export class UserDB extends DataSource {
  context: any;
  dataLoader: any;
  fakeUserData: User[];

  constructor() {
    // Can pass db connection in as arg and set as this.db;
    super();
    // this.db = any;
  }

  initialize(config: any) {
    this.context = config.context;
    this.dataLoader = {
      user: new DataLoader(async (idArr: number[]) => {
        const response = await this.getUsers(idArr);

        return idArr.map((id: number) =>
          response.find((user: any) => user.id === id)
        );
      })
    };
    this.fakeUserData = [{
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
    }]
  }

  async getUsers(idArr: number[]): Promise<User[]> {
    return this.fakeUserData;
  }

  async getUserById(userId: string): Promise<User> {
    const selectedUser = this.fakeUserData.find((obj) => obj.id === parseInt(userId, 10));

    if(selectedUser) {
      return selectedUser;
    } else {
      throw new ApolloError('User not found.', 'NOT_FOUND');
    }
  }
}
