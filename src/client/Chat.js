import React, { useState } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { GET_CHAT } from './apollo/queries/getChat';
import { ADD_MESSAGE } from './apollo/mutations/addMessage';


const Chat = (props) => {
  const { chatId, closeChat } = props;
  const { loading, error, data } = useQuery(GET_CHAT, {
    variables: { chatId }
  });
  const [text, setText] = useState('');
  const [addMessage] = useMutation(ADD_MESSAGE, {
    update(cache, { data: { addMessage } }) {
      cache.modify({
        id: cache.identify(data.chat),
        fields: {
          messages(existingMessages =[]) {
            const newMessageRef = cache.writeFragment({
              data: addMessage,
              fragment: gql`
                fragment NewMessage on Chat {
                  id
                  type
                }
              `
            });
            return [...existingMessages, newMessageRef];
          }
        }
      });
    }
  });

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && text.length) {
      addMessage({ variables: { message: { text, chatId } } })
        .then(() => {
          setText('');
        })
    }
  };

  if (loading) return <div className='chatWindow'><p>Loading...</p></div>;
  if (error) return <div className='chatWindow'><p>Loading...</p></div>;

  const { chat } = data;

  return (
    <div className="chatWindow">
      <div className="header">
        <span>{chat.users[1].username}</span>
        <button onClick={() => closeChat(chatId)} className="close">X</button>
      </div>
      <div className='messages'>
        {chat.messages.map((message, j) => 
          <div key={'message' + message.id} className={'message ' + (message.user.id > 1 ? 'left': 'right')}>
            {message.text}
          </div>
        )}
      </div>
      <div className='input'>
        <input type='text' value={text} onChange={(e) => setText(e.target.value)} onKeyPress={handleKeyPress} />
      </div>
    </div>
  )
}

export default Chat;