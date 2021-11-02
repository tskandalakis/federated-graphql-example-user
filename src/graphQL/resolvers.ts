import { GraphQLResolverMap } from 'apollo-graphql';

export const resolvers: GraphQLResolverMap<any> = {
  Query: {
    getUsers: async (_source, _args, ctx)=> {
      return ctx.dataSources.userAPI.getUsers(_args.paginationInput);
    },
    getUser: async (_source, _args, ctx)=> {
      return ctx.dataSources.userDB.getUserById(_args.userId);
    },
  },
  // Mutation: {
  //   createUser: async (_source, _args, { dataSources }) => {
  //     return dataSources.userDB.createUser(_args.userForm);
  //   },
  //   updateUser: async (_source, _args, { dataSources }) => {
  //     return dataSources.userDB.updateUser(_args.userForm);
  //   },
  //   deleteUser: async (_source, _args, { dataSources }) => {
  //     return dataSources.userDB.deleteUser(_args.userId);
  //   },
  // },
  User: {
    __resolveReference: async (obj, ctx) => {
      return ctx.dataSources.userDB.loadUser(obj.id);
    }
  },
};
