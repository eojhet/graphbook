import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Bar from './components/bar';
import Feed from './Feed';
import Chats from './Chats';
import Loading from './components/loading';
import '/assets/css/style.css';
import './components/fontawesome';
// import { UserProvider } from './components/context/user';

import LoginRegisterForm from './components/loginregister';
import { useCurrentUserQuery } from './apollo/queries/currentUserQuery';
import { withApollo } from '@apollo/client/react/hoc';

const App = ({ client }) => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('jwt'));
  const { data, error, loading, refetch } = useCurrentUserQuery();

  useEffect(() => {
    const unsubscribe = client.onClearStore(
      () => {
        if (loggedIn) {
          setLoggedIn(false)
        }
      }
    );
    return () => {
      unsubscribe();
    }
  }, []);

  const handleLogin = (status) => {
    refetch().then(() => {
      setLoggedIn(status);
    }).catch(() => {
      setLoggedIn(status);
    });
  };
  
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
          <Bar changeLoginState={handleLogin} />
          <Feed />
          <Chats />
        </div>
      )}
      {!loggedIn && <LoginRegisterForm changeLoginState={handleLogin} />}
      {/* </UserProvider> */}
    </div>
  )
};

export default withApollo(App);