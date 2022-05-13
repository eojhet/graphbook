import logger from '../../helpers/logger.js';

let posts = [
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
  RootMutation: {
    addPost(root, { post, user }, context) {
      const postObject = {
        ...post,
        user,
        id: posts.length + 1,
      };
      posts.push(postObject);
      logger.log({ level: 'info', message: 'Post was created' });
      return postObject;
    },
  },
};

export default resolvers;