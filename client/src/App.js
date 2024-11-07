import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import ProgressBar from './components/ProgressBar';
import HomePage from './components/HomePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-product" element={<ProgressBar />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;