import React, { createContext, useState } from 'react';

// Create a new context
export const UserContext = createContext();

// Create a context provider component
export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState('');

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};
