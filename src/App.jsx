import { useState } from 'react';
import { Mainlayout, PrivateRoute, PublicRoute } from './core';
import { Routes, Route } from 'react-router-dom';

import { Dashboard, Auth, Main, Terms, Policy, Edit } from './feature';

import './main.scss';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const updateToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  return (
    <Mainlayout hasUser={!!token}>
      <div className="App">
        <Routes>
          <Route
            path="dashboard"
            element={<PrivateRoute user={token} children={<Dashboard />} />}
          />
          <Route
            path="edit"
            element={<PrivateRoute user={token} children={<Edit />} />}
          />
          <Route
            path="login"
            element={
              <PublicRoute
                user={token}
                children={<Auth type="login" updateToken={updateToken} />}
              />
            }
          />
          <Route
            path="register"
            element={
              <PublicRoute
                user={token}
                children={<Auth type="register" updateToken={updateToken} />}
              />
            }
          />
          <Route path="/" element={<Main type="main" />} />
          <Route path="terms" element={<Terms type="terms" />} />
          <Route path="policy" element={<Policy type="policy" />} />
        </Routes>
      </div>
    </Mainlayout>
  );
}

export default App;
