import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Feed from './Feed';
import '/assets/css/style.css';

const App = () => {

  return (
    <div className='container'>
      <Helmet>
        <title>Graphbook - Feed</title>
        <meta name="description" content="All your friends are here."></meta>
      </Helmet>
      <Feed />      
    </div>
  )
};

export default App;