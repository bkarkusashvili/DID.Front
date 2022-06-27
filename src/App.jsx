import { Mainlayout } from './core';
import { Routes, Route } from 'react-router-dom';

import { Dashboard, Auth } from './feature';

import './main.scss';

function App() {
  return (
    <Mainlayout>
      <div className="App">
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="login" element={<Auth type="login" />} />
          <Route path="register" element={<Auth type="register" />} />
        </Routes>
      </div>
    </Mainlayout>
  );
}

export default App;
