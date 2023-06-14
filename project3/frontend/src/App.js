import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DbManager from './components/dbManager';
import Director from './components/director';
import Audience from './components/audience';
import { UserProvider } from './UserContext';

const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <nav>
          <h1>Select User Type</h1>
          <ul>
            <li>
              <button onClick={() => window.location.href = '/audience'}>
                Audience
              </button>
            </li>
            <li>
              <button onClick={() => window.location.href = '/director'}>
                Director
              </button>
            </li>
            <li>
              <button onClick={() => window.location.href = '/dbManager'}>
                DbManager
              </button>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/audience" element={<Audience />} />
          <Route path="/director" element={<Director />} />
          <Route path="/dbManager" element={<DbManager />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;

