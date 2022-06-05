import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Bar from './components/bar';
import Feed from './Feed';
import Chats from './Chats';
import '/assets/css/style.css';
import './components/fontawesome';
// import { UserProvider } from './components/context/user';
import LoginRegisterForm from './components/loginregister';
import { useCurrentUserQuery } from './apollo/queries/currentUserQuery';
import Loading from './components/loading';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('jwt'));
  const { data, error, loading, refetch } = useCurrentUserQuery();
  
  if (loading) {
    return <Loading />;
  }
  
  return (
    <div className='container'>
      <Helmet>
        <title>Graphbook - Feed</title>
        <meta name="description" content="All your friends are here."></meta>
      </Helmet>
      {/* <UserProvider> */}
      {loggedIn && (
        <div>
          <Bar />
          <Feed />
          <Chats />
        </div>
      )}
      {!loggedIn && <LoginRegisterForm changeLoginState={setLoggedIn} />}
      {/* </UserProvider> */}
    </div>
  )
};

export default App;