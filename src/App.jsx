import { useState } from "react";
import { Mainlayout, PrivateRoute, PublicRoute } from "./core";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";

import { Dashboard, Auth, Main, Terms, Policy, CreateOrEdit } from "./feature";

import "./main.scss";
import { API } from "./env";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  const updateToken = (newToken) => {
    if (newToken === null) {
      localStorage.removeItem("token");
    } else {
      localStorage.setItem("token", newToken);
    }

    setToken(newToken);
  };

  const logout = () => {
    axios
      .post(API + "logout", null, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        updateToken(null);
        navigate("/");
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
                <Dashboard token={token} logout={() => updateToken(null)} />
              }
            />
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
        <Route
          path="reset"
          element={
            <PublicRoute
              user={token}
              children={<Auth type="reset" updateToken={updateToken} />}
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
