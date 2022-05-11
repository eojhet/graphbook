import React, { useState } from 'react';

const initialPosts = [
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

const App = () => {
  const [posts, setPosts] = useState(initialPosts);

  return (
    <div className='conatiner'>
      <div className='feed'>

        { posts.map((post, i) => 

          <div key={post.id} className="post">
            <div className='header'>
              <img src={post.user.avatar} />
              <h2>{post.user.username}</h2>
            </div>
            <p className='content'>
              {post.text}
            </p>
          </div>

        )}

      </div>
    </div>
  )
};

export default App;