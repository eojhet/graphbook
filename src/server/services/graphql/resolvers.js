const posts = [
  {
    id: 2,
    text: 'Fart Brains',
    user: {
      avatar: '/uploads/avatar1.png',
      username: 'Turd Ferguson'
    }
  },
  {
    id: 1,
    text: 'Yes please!',
    user: {
      avatar: '/uploads/avatar2.png',
      username: 'Spaghetti Man'
    }
  }
]

const resolvers = {
  RootQuery: {
    posts(root, args, context) {
      return posts;
    },
  },
};

export default resolvers;