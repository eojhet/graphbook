const typeDefinitions = `
  input PostInput {
    text: String!
  }
  input UserInput {
    username: String!
    avatar: String!
  }
  type RootMutation {
    addPost (
      post: PostInput!
    ): Post
  }
  type User {
    avatar: String
    username: String
  }
  type Post {
    id: Int
    text: String
    user: User
  }
  type RootQuery {
    posts: [Post]
  }
  schema {
    query: RootQuery
    mutation: RootMutation
  }
`;

export default [typeDefinitions];