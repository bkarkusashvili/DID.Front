import { useState, useEffect} from 'react';
import { Mainlayout, PrivateRoute, PublicRoute } from './core';
import { Routes, Route, useNavigate, useSearchParams } from 'react-router-dom';
import {GoogleCallback} from './feature/auth/components/socialLogin/GoogleCallback.jsx'
import axios from 'axios';

import {
  Dashboard,
  Auth,
  Main,
  Terms,
  Policy,
  CreateOrEdit,
  TypeForm,
} from './feature';

import './main.scss';
import { API } from './env';
import { CreateOrEditSite } from './feature/dashboard/createOrEditSite/CreateOrEditSite';

function App() {

  const [search] = useSearchParams();
  const [token, setToken] = useState(
    search.get('access_token') || localStorage.getItem('access_token')
    );

    const navigate = useNavigate();

  const updateToken = (newToken) => {
    if (newToken === null) {
      localStorage.removeItem('access_token');
    } else {
      localStorage.setItem('access_token', newToken);
    }

    setToken(newToken);
    console.log(newToken)
  };

  const [userId, setUserId] = useState(
    search.get('user_id') || localStorage.getItem('user_id') 
  )
  const updateUserId = (newUserId) => {
    if (newUserId === null) {
      localStorage.removeItem('user_id');
    } else {
      localStorage.setItem('user_id', newUserId);
    }

    setUserId(newUserId);
    console.log(newUserId)
  };

  const logout = () => {
    axios
      .post(API + 'logout', null, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        updateToken(null);
        updateUserId(null)
        navigate('/');
      })
      .catch(() => {});
  };

  return (
    <Mainlayout hasUser={!!token} logout={logout}>
      <Routes>
        <Route
          path="dashboard"
          element={
            <PrivateRoute
              user={token}
              children={
                <Dashboard token={token}  logout={() => updateToken(null)} />
              }
            />
          }
        />
        <Route
          path="form/:id"
          element={
            <PrivateRoute user={token} children={<TypeForm token={token} />} />
          }
        />
        <Route
          path="edit/:type/:id"
          element={
            <PrivateRoute
              user={token}
              children={
                <CreateOrEdit token={token} logout={() => updateToken(null)} />
              }
            />
          }
        />
        <Route
          path="create/:type"
          element={
            <PrivateRoute
              user={token}
              children={
                <CreateOrEdit token={token} logout={() => updateToken(null)} />
              }
            />
          }
        />
        <Route
          path="edit/site/:id"
          element={
            <PrivateRoute
              user={token}
              children={
                <CreateOrEditSite
                  token={token}
                  logout={() => updateToken(null)}
                />
              }
            />
          }
        />
        <Route
          path="create/site"
          element={
            <PrivateRoute
              user={token}
              children={
                <CreateOrEditSite
                  token={token}
                  logout={() => updateToken(null)}
                />
              }
            />
          }
        />
        <Route
          path="login"
          element={
            <PublicRoute
              user={token}
              children={<Auth type="login" updateToken={updateToken} updateUserId={updateUserId} />}
            />
          }
        />
        <Route path="/auth/google" element={<GoogleCallback updateToken={updateToken}  updateUserId={updateUserId}  />}></Route>
        <Route
          path="register"
          element={
            <PublicRoute
              user={token}
              children={<Auth type="register" updateToken={updateToken} updateUserId={updateUserId} />}
            />
          }
        />
        <Route
          path="reset"
          element={
            <PublicRoute
              user={token}
              children={<Auth type="reset" updateToken={updateToken} updateUserId={updateUserId} />}
            />
          }
        />
        <Route
          path="/"
          element={<PublicRoute user={token} children={<Main type="main" />} />}
        />
        <Route path="terms" element={<Terms type="terms" />} />
        <Route path="policy" element={<Policy type="policy" />} />
      </Routes>
    </Mainlayout>
  );
}

export default App;
