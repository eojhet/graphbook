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
  }
  type User {
    id: Int
    avatar: String
    username: String
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
  }
  type RootQuery {
    posts: [Post]
    chats: [Chat]
    chat(chatId: Int): Chat
  }
  schema {
    query: RootQuery
    mutation: RootMutation
  }
`;

export default [typeDefinitions];