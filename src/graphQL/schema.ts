import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  scalar Date

  type Query {
    getUsers(
      paginationInput: PaginationInput
    ): UsersResponse
    getUser(
      userId: ID!
    ): User
  }

  type Mutation {
    createUser(
      token: ID!
      userForm: CreateUserInput!
    ): User
    updateUser(
      userId: ID!
      userForm: UpdateUserInput!
    ): User
    deleteUser(
      userId: ID!
    ): Boolean
  }

  type User @key(fields: "id") {
    id: ID!
    name: String
    email: String
    created: Date
    updated: Date
  }

  type UsersResponse {
    data: [User]
    paginationData: Pagination
  }

#  extend type Book @key(fields: "id") {
#    id: ID @external
#  }

  input CreateUserInput {
    name: String!
    email: String!
  }

  input UpdateUserInput {
    name: String!
    email: String!
  }

  type Pagination {
    page: Int
    size: Int
    total: Int
    sort: [SortBy]
  }

  type SortBy {
    property: String
    direction: SortDirection
  }

  input PaginationInput {
    page: Int
    size: Int
    filter: [FilterByInput]
    sort: [SortByInput]
  }

  input FilterByInput {
    property: String
    value: String
  }

  input SortByInput {
    property: String
    direction: SortDirection
  }

  enum SortDirection {
    ASC
    DESC
  }
`;
