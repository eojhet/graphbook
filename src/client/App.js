import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Bar from './components/bar';
import Feed from './Feed';
import Chats from './Chats';
import '/assets/css/style.css';
import './components/fontawesome';

const App = () => {

  return (
    <div className='container'>
      <Helmet>
        <title>Graphbook - Feed</title>
        <meta name="description" content="All your friends are here."></meta>
      </Helmet>
      <Bar />
      <Feed />
      <Chats />
    </div>
  )
};

export default App;