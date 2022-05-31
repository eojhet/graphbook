import React from 'react';
import { ApolloConsumer } from '@apollo/client';

export const UserConsumer = ({ children }) => {
  return (
    <ApolloConsumer>
      {client => {
        // Use client.readQuery to get the currently logged in user
        const user = {
          username: "Test User",
          avatar: "/uploads/avatar1.png"
        };
        return React.Children.map(children,
          function(child) {
            return React.cloneElement(child, { user });
          });
      }}
    </ApolloConsumer>
  );
};

// import React, { createContext } from 'react';

// const { Provider, Consumer } = createContext();

// export const UserProvider = ({ children }) => {
//   const user = {
//     username: "Test User",
//     avatar: "/uploads/avatar1.png"
//   };

//   return (
//     <Provider value={user}>
//       {children}
//     </Provider>
//   );
// };

// export const UserConsumer = ({ children }) => {
//   return (
//     <Consumer>
//       {user => React.Children.map(children,
//         function(child) {
//           return React.cloneElement(child, { user });
//         })}
//     </Consumer>
//   );
// };