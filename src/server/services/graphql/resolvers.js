import logger from '../../helpers/logger.js';
import Sequelize from 'sequelize';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';

const { JWT_SECRET } = process.env;
const Op = Sequelize.Op;

export default function resolver() {

  const { db } = this;
  const { Post, User, Chat, Message } = db.models;

  const resolvers = {
    Post: {
      user(post, args, context) {
        return post.getUser();
      },
    },
    Message: {
      user(message, args, context) {
        return message.getUser();
      },
      chat(message, args, context) {
        return message.getChat();
      },
    },
    Chat: {
      messages(chat, args, context) {
        return chat.getMessages({ order: [['id', 'ASC']] });
      },
      users(chat, args, context) {
        return chat.getUsers();
      },
      lastMessage(chat, args, context) {
        return chat.getMessages({ limit: 1, order: [['id', 'DESC' ]]})
          .then((message) => {return message[0];});
      },
    },
    RootQuery: {
      currentUser(root, args, context) {
        return context.user;
      },
      postsFeed(root, { page, limit }, context) {
        var skip = 0;
        if (page && limit) {
          skip = page * limit;
        }
        var query = {
          order: [['createdAt', 'DESC']],
          offset: skip,
        };
        if (limit) {
          query.limit = limit;
        }
        return {
          posts: Post.findAll(query)
        };
      },
      posts(root, args, context) {
        return Post.findAll({ order: [['createdAt', 'DESC']] });
      },
      chat(root, { chatId }, context) {
        return Chat.findByPk(chatId, {
          include: [{
            model: User,
            required: true,
          },
          {
            model: Message,
          }],
        });
      },
      chats(root, args, context) {
        return Chat.findAll({
          include: [{
            model: User,
            required: true,
            through: { where: { userId: context.user.id }},
          },
          {
            model: Message,
          }],
        });
      },
      usersSearch(root, { page, limit, text }, context) {
        if (text.length < 3) {
          return {
            users: []
          };
        }
        var skip = 0;
        if (page && limit) {
          skip = page * limit;
        }
        var query = {
          order: [['createdAt', 'DESC']],
          offset: skip,
        };
        if (limit) {
          query.limit = limit;
        }
        query.where = {
          username: {
            [Op.like]: '%' + text + '%'
          }
        };
        return {
          users: User.findAll(query)
        };
      },
    },
    RootMutation: {
      addMessage(root, { message }, context) {
        return Message.create({
          ...message,
        }).then((newMessage) => {
          return Promise.all([
            newMessage.setUser(context.user.id),
            newMessage.setChat(message.chatId),
          ]).then(() => {
            logger.log({
              level: 'info',
              message: 'Message was created',
            });
            return newMessage;
          });
        });
      },
      addChat(root, { chat }, context) {
        return Chat.create().then((newChat) => {
          return Promise.all([
            newChat.setUsers(chat.users),
          ]).then(() => {
            logger.log({
              level: 'info',
              message: 'Message was created',
            });
            return newChat;
          });
        });
      },
      addPost(root, { post }, context) {
        return Post.create({
          ...post,
        }).then((newPost) => {
          return Promise.all([
            newPost.setUser(context.user.id),
          ]).then(() => {
            logger.log({
              level: 'info',
              message: 'Post was created',
            });
            return newPost;
          });
        });
      },
      deletePost(root, { postId }, context) {
        return Post.destroy({
          where: {
            id: postId
          }
        }).then (function(rows) {
          if (rows === 1) {
            logger.log({
              level: 'info',
              message: 'Post ' + postId + ' was deleted',
            });
            return {
              success: true
            };
          }
          return {
            success: false
          };
        }, function (err) {
          logger.log({
            level: 'error',
            message: err.message,
          });
        });
      },


      login (root, { email, password }, context) {
        return User.findAll({
          where: {
            email
          },
          raw: true
        }).then(async (users) => {
          if (users.length === 1) {
            const user = users[0];

            // swap when you have a hash, it won't compare otherwise.
            // const passwordValid = await bcrypt.compare( password, user.password);
            const passwordValid = password === user.password;


            if (!passwordValid) {
              throw new Error('Password does not match');
            }
            const token = JWT.sign(
              { email, id: user.id },
              JWT_SECRET, 
              { expiresIn: '1d' }
            );
            return {
              token
            };
          } else {
            throw new Error("User not found");
          }
        })
      }
    },
  };

  return resolvers;
}
