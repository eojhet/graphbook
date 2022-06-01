const typeDefinitions = `
  input PostInput {
    text: String!
  }
  input UserInput {
    username: String!
    avatar: String!
  }
  input ChatInput {
    users: [Int]
  }
  input MessageInput {
    text: String!
    chatId: Int!
  }
  type RootMutation {
    addPost (
      post: PostInput!
    ): Post
    addChat (
      chat: ChatInput!
    ): Chat
    addMessage (
      message: MessageInput!
    ): Message
    deletePost (
      postId: Int!
    ): Response
    login (
      email: String!
      password: String!
    ): Auth
  }
  type Auth{
    token: String
  }
  type User {
    id: Int
    avatar: String
    username: String
  }
  type UsersSearch {
    users: [User]
  }
  type Post {
    id: Int
    text: String
    user: User
  }
  type Message {
    id: Int
    text: String
    chat: Chat
    user: User
  }
  type Chat {
    id: Int
    messages: [Message]
    users: [User]
    lastMessage: Message
  }
  type PostFeed {
    posts: [Post]
  }
  type Response {
    success: Boolean
  }
  type RootQuery {
    posts: [Post]
    chats: [Chat]
    chat(chatId: Int): Chat
    postsFeed(page: Int, limit: Int): PostFeed
    usersSearch(page: Int, limit: Int, text: String!): UsersSearch
  }
  schema {
    query: RootQuery
    mutation: RootMutation
  }
`;

export default [typeDefinitions];