import React from 'react';
import { UserConsumer } from '../context/user';
import SearchBar from './search';
import UserBar from './user';
import Logout from './logout';

const Bar = ({ changeLoginState }) => {
  return (
    <div className='topbar'>
      <div className='inner'>
        <SearchBar />
        <UserConsumer>
          <UserBar />
        </UserConsumer>
      </div>
      <div className='buttons'>
        <Logout changeLoginState={changeLoginState} />
      </div>
    </div>
  );
};

export default Bar;