import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Home from './containers/Home';
import MovieContent from './components/MovieContent';

//! Minimal Viable Product
//! 
function App() {
  return (
    <div className="App">
      <NavBar />
      <Home />
      <MovieContent/>
    </div>
  );
}

export default App;
