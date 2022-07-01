import { Mainlayout } from "./core";
import { Routes, Route } from "react-router-dom";

import { Dashboard, Auth, Main, Terms, Policy, Edit } from "./feature";

import "./main.scss";

function App() {
  return (
    <Mainlayout>
      <div className="App">
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="edit" element={<Edit />} />
          <Route path="login" element={<Auth type="login" />} />
          <Route path="register" element={<Auth type="register" />} />
          <Route path="/" element={<Main type="main" />} />
          <Route path="terms" element={<Terms type="terms" />} />
          <Route path="policy" element={<Policy type="policy" />} />
        </Routes>
      </div>
    </Mainlayout>
  );
}

export default App;
