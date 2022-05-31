import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Bar from './components/bar';
import Feed from './Feed';
import Chats from './Chats';
import '/assets/css/style.css';
import './components/fontawesome';
// import { UserProvider } from './components/context/user';

const App = () => {

  return (
    <div className='container'>
      <Helmet>
        <title>Graphbook - Feed</title>
        <meta name="description" content="All your friends are here."></meta>
      </Helmet>
      {/* <UserProvider> */}
        <Bar />
        <Feed />
        <Chats />
      {/* </UserProvider> */}
    </div>
  )
};

export default App;