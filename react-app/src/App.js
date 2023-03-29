import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import WatchList from "./components/WatchList";
import { getMyWatchlists } from "./store/watchlists";
import MovieDetails from "./components/MovieDetails";
import HomePage from "./components/HomePage";
import './index.css'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
    dispatch(getMyWatchlists())
  }, [dispatch]);

  return (
    <div className="app">
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path='/' exact>
            <HomePage />
          </Route>
          <ProtectedRoute path='/mywatchlists'>
            <WatchList />
          </ProtectedRoute>
          <Route path='/movies/:id'>
            <MovieDetails />
          </Route>
        </Switch>
      )}
    </div>
  );
}

export default App;
