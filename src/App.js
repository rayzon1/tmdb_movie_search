import React, { useEffect } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Home from './containers/Home';
import { HashRouter, Route, Switch } from "react-router-dom";
import { fetchData } from "./actions/ThunkActions";
import { authToken } from "./config";
import { useDispatch } from 'react-redux';


function App() {

  const searchByMovie = `https://api.themoviedb.org/3/movie/popular?api_key=${authToken}&language=en-US&page=1`;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData(searchByMovie));
  }, [searchByMovie, dispatch]);

  return (
    <HashRouter>
      <Switch>
        <div className="App">
          <NavBar />
          <Route exact path='/' render={() => <p>Sign In Page</p>} />
          <Route exact path='/home' render={() => <Home />} />
        </div>
      </Switch>
    </HashRouter>
  );
}

export default App;
