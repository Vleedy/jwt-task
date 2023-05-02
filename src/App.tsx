import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TestPage from './TestPage';
import Authorization from './Authorization';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TestPage />} />
        <Route path="/login" element={<Authorization />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
